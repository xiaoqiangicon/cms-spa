/* eslint-disable no-param-reassign */
import cookie from 'js-cookie';
import Layout from '../sys/views/layout/Layout';

const routes = [
  {
    path: '/ling',
    component: Layout,
    controlMark: 'pw_yaolingling',
    redirect: 'noredirect',
    children: [
      {
        path: 'index',
        component: () => import('../ling/index/App'),
        name: '礼品管理',
        meta: { title: '礼品管理', icon: 'fa-circle', noCache: true },
      },
    ],
  },
];

const isLocal =
  window.location.hostname.split('.')[0].indexOf('localhost') > -1;

const valid = item =>
  isLocal || !item.controlMark || !!parseInt(cookie.get(item.controlMark), 10);

const first = routes.filter(item => valid(item));

first.forEach(item => {
  const { children } = item;
  item.children = children.filter(subItem => valid(subItem));
});

export default first.filter(item => item.children && item.children.length);
