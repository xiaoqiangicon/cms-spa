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
      {
        path: 'gift',
        component: () => import('../ling/gift/App'),
        name: '暴富奖品',
        meta: { title: '暴富奖品', noCache: true },
      },
      {
        path: 'send',
        component: () => import('../ling/send/App'),
        name: '暴富发奖',
        meta: { title: '暴富发奖', noCache: true },
      },
      {
        path: 'bubble',
        component: () => import('../ling/bubble/App'),
        name: '气泡广告',
        meta: { title: '气泡广告', noCache: true },
      },
      {
        path: 'entry',
        component: () => import('../ling/entry/App'),
        name: '许愿入口',
        meta: { title: '许愿入口', noCache: true },
      },
      {
        path: 'fate',
        component: () => import('../ling/fate/App'),
        name: '好运攻略',
        meta: { title: '好运攻略', noCache: true },
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
