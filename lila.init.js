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
  const { addCmdOption, setSetting, registerTask } = lila;

  registerTask('qiniu', qiniuTask);

  const envOption = ['-e, --env [env]', 'server env', /^(test|prod)$/, 'test'];

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

  return ({ argv, cmd, entry }) => {
    const isDev = cmd === 'dev' || cmd === 'serve';
    const isProd = argv.env === 'prod';

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
          target: `build/${realEntry}.html`,
        },
      ],
      [
        '@lila/convert',
        {
          file: `build/${realEntry}.html`,
          ext: 'jsp',
        },
      ],
      [
        '@lila/insert',
        {
          file: `build/${realEntry}.jsp`,
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
          cacheFileName: `cache-${isProd ? 'prod' : 'test'}`,
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
          server: isProd ? servers[1] : servers[0],
          remotePath: isProd
            ? '/usr/local/resin/projects/cms/dist/html/index'
            : '/usr/local/resin/projects/guest_statistics/dist/html/index',
          ext: 'jsp',
        },
      ],
      [
        '@lila/save-cache',
        {
          dir: 'build',
          cacheFileName: `cache-${isProd ? 'prod' : 'test'}`,
        },
      ],
      '@lila/del-build',
    ];

    return {
      tasks,
      staticServer: 'https://pic.zizaihome.com',
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
            chunks: 'initial', // ????????????????????????????????????
          },
          elementUI: {
            name: 'elementUI', // ????????? elementUI ??????
            priority: 20, // ??????????????? libs ??? app ????????????????????? libs ?????? app
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
          cwd,
          path.join(cwd, 'node_modules'),
        ];
        return webpackConfig;
      },
      mockRoot: 'api',
    };
  };
};
