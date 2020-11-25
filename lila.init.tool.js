/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import fse from 'fs-extra';
import { Base64 } from 'js-base64';
import tasksPlugin from 'lila-tasks';
import webpackPlugin from 'lila-webpack';
import { forVue } from 'lila-webpack-config';
import MomentLocalesPlugin from 'moment-locales-webpack-plugin';
import qiniuTask from './qiniu-task';

const { readFileSync } = fse;
const cwd = process.cwd();

export default lila => {
  const { setSetting, registerTask } = lila;

  setSetting('src', 'src-tool');

  registerTask('qiniu', qiniuTask);

  setSetting('beforeTasks', ({ argv, cmd }) => {
    lila.success(`\n  About to ${cmd}`);
  });

  setSetting('afterTasks', ({ argv, cmd }) => {
    lila.success(`\n  Succeeded to ${cmd}`);
  });

  tasksPlugin(lila);
  webpackPlugin(lila);
  forVue(lila);

  return ({ argv, cmd, entry }) => {
    const isDev = cmd === 'dev' || cmd === 'serve';

    const servers = [];
    try {
      const accounts = JSON.parse(
        Base64.decode(
          readFileSync(path.join(cwd, '../accounts/info.txt'), 'utf8')
        )
      );
      accounts.forEach(item => {
        servers.push({
          ignoreErrors: true,
          sshConfig: {
            host: item.host,
            username: item.user,
            password: item.pass,
          },
        });
      });
    } catch (e) {
      console.log('\nUse fake account.\n');
      '.'.repeat(10).forEach(() => {
        servers.push({
          host: 'fake-host',
          user: 'fake-user',
          path: 'fake-path',
        });
      });
    }

    const realEntry = entry === 'login' ? 'login' : 'index';

    const tasks = [
      '@lila/del-build',
      '@lila/webpack',
      [
        '@lila/move',
        {
          source: 'build/index.html',
          target: 'build/tool.html',
        },
      ],
      [
        '@lila/clean-cache',
        {
          dir: 'build',
          cacheFileName: 'tool-cache',
        },
      ],
      [
        'qiniu',
        {
          dirs: 'build',
        },
      ],
      [
        '@lila/sync-html',
        {
          server: servers[1],
          remotePath: '/usr/local/resin/projects/cms',
        },
      ],
      [
        '@lila/save-cache',
        {
          dir: 'build',
          cacheFileName: 'tool-cache',
        },
      ],
      '@lila/del-build',
    ];

    return {
      tasks,
      staticServer: 'https://pic.zizaihome.com',
      alias: {
        '@': path.join(__dirname, 'src-tool'),
      },
      define: {
        __SEE_ENV__: isDev ? 1 : 0,
      },
      provide: {
        jQuery: 'jquery',
      },
      plugins: [
        new MomentLocalesPlugin({
          localesToKeep: ['es-us', 'zh-cn'],
        }),
      ],
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial', // 只打包初始时依赖的第三方
          },
          elementUI: {
            name: 'elementUI', // 单独将 elementUI 拆包
            priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
            test: /[\\/]node_modules[\\/][^\\/]*element-ui[\\/]/,
          },
        },
      },
      babelExclude: [
        /node_modules/,
        /pro-com\/src\/(ueditor|libs-es5)/,
        /pro-com\\src\\(ueditor|libs-es5)/,
      ],
      rebuildWebpackConfig({ webpackConfig }) {
        /* eslint-disable no-param-reassign */
        webpackConfig.resolve.modules = [
          path.join(cwd, 'src-tool'),
          cwd,
          path.join(cwd, 'node_modules'),
        ];
        return webpackConfig;
      },
      mockRoot: 'api',
    };
  };
};
