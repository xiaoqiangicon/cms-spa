/* eslint-disable no-param-reassign */
import cookie from 'js-cookie';
import Layout from '../sys/views/layout/Layout';

const routes = [
  {
    path: '/ling',
    component: Layout,
    controlMark: 'pw_yaolingling',
    redirect: '/ling/index',
    name: '要灵灵管理',
    meta: { title: '要灵灵管理', icon: 'fa-circle', noCache: true },
    children: [
      {
        path: 'index',
        component: () => import('../ling/index/App'),
        name: '礼品管理',
        meta: { title: '礼品管理', noCache: true },
      },
      {
        path: 'edit/:id',
        component: () => import('../ling/edit/App'),
        name: '礼品添加/编辑',
        meta: { title: '礼品添加/编辑', noCache: true },
        hidden: !0,
      },
      {
        path: 'exchange',
        component: () => import('../ling/exchange/App'),
        name: '兑奖管理',
        meta: { title: '兑奖管理', noCache: true },
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