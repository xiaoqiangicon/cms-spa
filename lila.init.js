/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import fse from 'fs-extra';
import { Base64 } from 'js-base64';
import tasksPlugin from 'lila-tasks';
import webpackPlugin from 'lila-webpack';
import { forVue } from 'lila-webpack-config';
import MomentLocalesPlugin from 'moment-locales-webpack-plugin';

const { readFileSync } = fse;
const cwd = process.cwd();

export default lila => {
  const { addCmdOption, setSetting } = lila;

  const envOption = ['-e, --env [env]', 'server env', /^(test|gray)$/, 'test'];

  addCmdOption('sync', ...envOption);

  setSetting('beforeTasks', ({ argv, cmd }) => {
    lila.success(`\n  About to ${cmd}, with env[${argv.env}]\n`);
  });

  setSetting('afterTasks', ({ argv, cmd }) => {
    lila.success(`\n  Succeeded to ${cmd}, with env[${argv.env}]\n`);
  });

  tasksPlugin(lila);
  webpackPlugin(lila);
  forVue(lila);

  return ({ argv, cmd }) => {
    const isDev = cmd === 'dev' || cmd === 'serve';
    const isGray = argv.env === 'gray';

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

    const tasks = [
      '@lila/webpack',
      [
        '@lila/convert',
        {
          file: 'build/index.html',
          ext: 'jsp',
        },
      ],
      [
        '@lila/insert',
        {
          file: 'build/index.jsp',
          start:
            '<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>\n',
          // start:
          //     '<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>\n<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>\n<%@ page import="com.miaoyan.cms.action.UserManagerAction" %>\n<%\nUserManagerAction action = new UserManagerAction(request,response);\naction.doAction();\n%>\n<%@ page isELIgnored="true" %>',
        },
      ],
      [
        '@lila/clean-cache',
        {
          dir: 'build',
          cacheFileName: `cache-${isGray ? 'gray' : 'test'}`,
        },
      ],
      [
        '@lila/sync-build',
        {
          server: isGray ? servers[1] : servers[0],
          remotePath: isGray
            ? '/usr/local/resin/projects/cms'
            : '/usr/local/resin/projects/guest_statistics',
        },
      ],
      [
        '@lila/sync-html',
        {
          server: isGray ? servers[1] : servers[0],
          remotePath: isGray
            ? '/usr/local/resin/projects/cms/dist/html/index'
            : '/usr/local/resin/projects/guest_statistics/dist/html/index',
          ext: 'jsp',
        },
      ],
      [
        '@lila/save-cache',
        {
          dir: 'build',
          cacheFileName: `cache-${isGray ? 'gray' : 'test'}`,
        },
      ],
      '@lila/del-build',
    ];

    return {
      tasks,
      alias: {
        '@': path.join(__dirname, 'src'),
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
          path.join(cwd, 'src'),
          path.join(cwd, 'node_modules'),
        ];
        return webpackConfig;
      },
    };
  };
};
