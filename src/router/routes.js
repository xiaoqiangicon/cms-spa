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
  {
    path: '/finance',
    component: Layout,
    redirect: '/finance/pending',
    name: '善款中心',
    meta: { title: '善款中心', icon: 'fa-circle', noCache: true },
    children: [
      {
        path: 'pending',
        component: () => import('../finance/pending/App'),
        name: '待处理事项',
        meta: { title: '待处理事项', noCache: true },
        controlMark: 'pw_money',
      },
      {
        path: 'taking/:id',
        component: () => import('../finance/taking/App'),
        name: '提现账单详情',
        meta: { title: '提现账单详情', noCache: true },
        controlMark: 'pw_money',
        hidden: !0,
      },
      {
        path: `${domain}/finance/stat`,
        name: '善款统计',
        meta: { title: '善款统计' },
        controlMark: 'pw_money',
      },
      {
        path: `${domain}/earningsStatistics/stat`,
        name: '盈收统计',
        meta: { title: '盈收统计', noCache: true },
        controlMark: 'pw_cash_stat',
      },
      {
        path: `${domain}/cash/income`,
        name: '盈收管理',
        meta: { title: '盈收管理', noCache: true },
        controlMark: 'pw_rate',
      },
      {
        path: `${domain}/cash/record`,
        name: '人工记账',
        meta: { title: '人工记账', noCache: true },
        controlMark: 'pw_cash_income',
      },
      {
        path: `${domain}/cash/remark`,
        name: '提醒备注',
        meta: { title: '提醒备注', noCache: true },
        controlMark: 'pw_cash_remark',
      },
      {
        path: `${domain}/cash/jing`,
        name: '交易统计',
        meta: { title: '交易统计', noCache: true },
        controlMark: 'pw_cash_jing',
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
