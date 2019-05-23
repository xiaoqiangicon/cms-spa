/* eslint-disable no-param-reassign */
import Layout from '../sys/views/layout/Layout';
import { domain, valid } from './data';

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
      {
        path: `${domain}/wish/marker`,
        name: '祈福牌管理',
        meta: { title: '祈福牌管理' },
      },
    ],
  },
  {
    path: '/qu',
    component: Layout,
    controlMark: 'pw_qutoutiao',
    redirect: '/qu/article',
    name: '趣头条管理',
    meta: { title: '趣头条管理', icon: 'fa-circle', noCache: true },
    children: [
      {
        path: 'article',
        component: () => import('../qu/article/App'),
        name: '订阅文章列表',
        meta: { title: '订阅文章列表', noCache: true },
      },
    ],
  },
  {
    path: '/promo',
    component: Layout,
    controlMark: 'pw_promo',
    redirect: '/promo/index',
    name: '运营事件',
    meta: { title: '运营事件', icon: 'fa-circle', noCache: true },
    children: [
      {
        path: 'index',
        component: () => import('../promo/index/App'),
        name: '事件管理',
        meta: { title: '事件管理', noCache: true },
      },
      {
        path: 'statistics',
        component: () => import('../promo/statistics/App'),
        name: '事件统计',
        meta: { title: '事件统计', noCache: true },
      },
      {
        path: `${domain}/event/thousand`,
        name: '千寺祈福',
        meta: { title: '千寺祈福'},
      },
      {
        path: `${domain}/goods/index`,
        name: '自在好物',
        meta: { title: '自在好物'},
      },
      {
        path: 'transferSet/:id',
        component: () => import('../promo/transfer_set/App'),
        name: '转单系统/转单设置',
        meta: { title: '转单系统/转单设置', noCache: true },
        hidden: !0,
      },
      {
        path: 'mergeSet/:id',
        component: () => import('../promo/merge_set/App'),
        name: '转单系统/组合设置',
        meta: { title: '转单系统/组合设置', noCache: true },
        hidden: !0,
      },
      {
        path: 'buddhistEdit/:id',
        component: () => import('../promo/buddhist_edit/App'),
        name: '推广佛事/推广编辑',
        meta: { title: '推广佛事/推广编辑', noCache: true },
        hidden: !0,
      },
      {
        path: 'fubiRecord/:id',
        component: () => import('../promo/fubi_record/App'),
        name: '福币分享/记录',
        meta: { title: '福币分享/记录', noCache: true },
        hidden: !0,
      },
    ],
  },
  {
    path: '/temple',
    component: Layout,
    controlMark: 'pw_temple',
    redirect: '/temple/super',
    name: '寺院管理',
    meta: { title: '寺院管理', icon: 'fa-circle', noCache: true },
    children: [
      {
        path: 'super',
        component: () => import('../temple/super/App'),
        name: '超级访问',
        meta: { title: '超级访问', noCache: true },
      },
      {
        path: `${domain}/temple/verify`,
        name: '寺院审核',
        meta: { title: '寺院审核' },
      },
      {
        path: `${domain}/temple/certification`,
        name: '寺院列表',
        meta: { title: '寺院列表' },
      },
      {
        path: `${domain}/finance/verifyIndex`,
        name: '善款资料审核',
        meta: { title: '善款资料审核' },
      },
    ],
  },
];

const first = routes.filter(item => valid(item));

first.forEach(item => {
  const { children } = item;
  item.children = children.filter(subItem => valid(subItem));
});

export default first.filter(item => item.children && item.children.length);
