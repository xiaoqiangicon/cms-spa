/* eslint-disable no-param-reassign */
import Layout from '../sys/views/layout/Layout.vue';

export default [
  {
    path: '/ling',
    component: Layout,
    redirect: '/ling/index',
    name: 'ling',
    meta: { title: '要灵灵管理', icon: 'fa-circle', noCache: true },
    children: [
      {
        path: 'index',
        component: () => import('../ling/index/App.vue'),
        name: 'ling-index',
        meta: { title: '礼品管理', noCache: true },
      },
      {
        path: 'edit/:id',
        component: () => import('../ling/edit/App.vue'),
        name: 'ling-edit',
        meta: { title: '礼品添加 / 编辑', noCache: true },
        hidden: !0,
      },
      {
        path: 'exchange',
        component: () => import('../ling/exchange/App.vue'),
        name: 'ling-exchange',
        meta: { title: '兑奖管理', noCache: true },
      },
      {
        path: 'gift',
        component: () => import('../ling/gift/App.vue'),
        name: 'ling-gift',
        meta: { title: '暴富奖品', noCache: true },
      },
      {
        path: 'send',
        component: () => import('../ling/send/App.vue'),
        name: 'ling-send',
        meta: { title: '暴富发奖', noCache: true },
      },
      {
        path: 'bubble',
        component: () => import('../ling/bubble/App.vue'),
        name: 'ling-bubble',
        meta: { title: '气泡广告', noCache: true },
      },
      {
        path: 'entry',
        component: () => import('../ling/entry/App.vue'),
        name: 'ling-entry',
        meta: { title: '许愿入口', noCache: true },
      },
      {
        path: 'fate',
        component: () => import('../ling/fate/App.vue'),
        name: 'ling-fate',
        meta: { title: '好运攻略', noCache: true },
      },
      {
        path: '/wish/marker',
        name: 'wish-marker',
        meta: { title: '祈福牌管理' },
      },
      {
        path: 'face',
        component: () => import('../ling/face/App.vue'),
        name: 'ling-face',
        meta: { title: '互动发言', noCache: true },
      },
    ],
  },
  {
    path: '/fubi',
    component: Layout,
    redirect: '/fubi/index',
    name: 'fubi',
    meta: { title: '福币分销', icon: 'fa-circle', noCache: true },
    children: [
      {
        path: 'index',
        component: () => import('../fubi/index/App.vue'),
        name: 'fubi-index',
        meta: { title: '福币商城', noCache: true },
      },
    ],
  },
  {
    path: '/promo',
    component: Layout,
    redirect: '/promo/index',
    name: 'promo',
    meta: { title: '运营事件', icon: 'fa-circle', noCache: true },
    children: [
      {
        path: 'index',
        component: () => import('../promo/index/App.vue'),
        name: 'promo-index',
        meta: { title: '事件管理', noCache: true },
      },
      {
        path: 'index/transfer-list',
        component: () => import('../promo/index/App.vue'),
        name: 'promo-index-transfer-list',
        meta: { title: '事件管理 / 转单列表', noCache: true },
        hidden: !0,
      },
      {
        path: 'statistics',
        component: () => import('../promo/statistics/App.vue'),
        name: 'promo-statistics',
        meta: { title: '转单统计', noCache: true },
      },
      {
        path: 'ci',
        component: () => import('../promo/ci/App.vue'),
        name: 'promo-ci',
        meta: { title: '慈光计划', noCache: true },
      },
      {
        path: 'topic',
        component: () => import('../promo/topic/App.vue'),
        name: 'promo-topic',
        meta: { title: '专题管理', noCache: true },
      },
      {
        path: 'topicEdit/:id',
        component: () => import('../promo/topic_edit/App.vue'),
        name: 'promo-topicEdit',
        meta: { title: '专题列表 / 编辑专题', noCache: true },
        hidden: !0,
      },
      {
        path: 'topicEditComponent/:id/:title',
        component: () => import('../promo/topic_component_edit/App'),
        name: 'promo-topicEdit2',
        meta: { title: '专题列表 / 编辑专题 / 编辑组件', noCache: true },
        hidden: !0,
      },
      {
        path: 'topicStatistic/:id',
        component: () => import('../promo/topic_statistic/App.vue'),
        name: 'promo-topicStatistic',
        meta: { title: '专题列表 / 专题数据', noCache: true },
        hidden: !0,
      },
      {
        path: 'topicCreate/:id',
        component: () => import('../promo/topic_edit/App.vue'),
        name: 'promo-topicCreate',
        meta: { title: '专题列表 / 新建专题', noCache: true },
        hidden: !0,
      },
      {
        path: '/event/thousand',
        name: 'event-thousand',
        meta: { title: '千寺祈福' },
      },
      {
        path: '/goods/index',
        name: 'goods-index',
        meta: { title: '自在好物' },
      },
      {
        path: 'transferSet/:id',
        component: () => import('../promo/transfer_set/App.vue'),
        name: 'promo-transferSet',
        meta: { title: '转单系统 / 转单设置', noCache: true },
        hidden: !0,
      },
      {
        path: 'mergeSet/:id',
        component: () => import('../promo/merge_set/App.vue'),
        name: 'promo-mergeSet',
        meta: { title: '转单系统 / 组合设置', noCache: true },
        hidden: !0,
      },
      {
        path: 'buddhistEdit/:id',
        component: () => import('../promo/buddhist_edit/App.vue'),
        name: 'promo-buddhistEdit',
        meta: { title: '推广佛事 / 推广编辑', noCache: true },
        hidden: !0,
      },
      {
        path: 'fubiRecord/:id',
        component: () => import('../promo/fubi_record/App.vue'),
        name: 'promo-fubiRecord',
        meta: { title: '福币分享 / 记录', noCache: true },
        hidden: !0,
      },
      {
        path: 'pay-pop',
        component: () => import('../promo/pay-pop/App.vue'),
        name: 'promo-pay-pop',
        meta: { title: '支付完成设置', noCache: true },
      },
      {
        path: 'projectManage',
        component: () => import('../promo/project_manage/App.vue'),
        name: 'promo-projectManage',
        meta: { title: '第三方项目管理', noCache: true },
      },
      {
        path: 'projectManage/:id',
        component: () => import('../promo/project_manage_detail/App.vue'),
        name: 'promo-projectManage-id',
        meta: { title: '第三方项目管理 / 绑定佛事列表', noCache: true },
        hidden: !0,
      },
      {
        path: 'projectManageDetail/:id',
        component: () => import('../promo/project_item_detail/App'),
        name: 'promo-projectManage-id-id',
        meta: { title: '绑定佛事列表 / 详情', noCache: true },
        hidden: !0,
      },
    ],
  },
  {
    path: '/temple',
    component: Layout,
    redirect: '/temple/super',
    name: 'temple',
    meta: { title: '寺院管理', icon: 'fa-circle', noCache: true },
    children: [
      {
        path: 'super',
        component: () => import('../temple/super/App.vue'),
        name: 'temple-super',
        meta: { title: '超级访问', noCache: true },
      },
      {
        path: 'notice',
        component: () => import('../temple/notice/App.vue'),
        name: 'temple-notice',
        meta: { title: '寺院通知', noCache: true },
      },
      {
        path: '/temple/verify',
        name: 'temple-verify',
        meta: { title: '寺院审核' },
      },
      {
        path: '/temple/certification',
        name: 'temple-certification',
        meta: { title: '寺院列表' },
      },
      {
        path: '/finance/verifyIndex',
        name: 'finance-verifyIndex',
        meta: { title: '善款资料审核' },
      },
      {
        path: 'comment',
        component: () => import('../temple/comment/App.vue'),
        name: 'temple-comment',
        meta: { title: '评价管理', noCache: true },
      },
      {
        name: 'temple-integral-task',
        path: 'integral-task',
        component: () => import('../temple/integral-task/App.vue'),
        meta: { title: '积分任务', noCache: true },
      },
      {
        name: 'temple-integrate',
        path: 'integrate',
        component: () => import('../buddhist/integrate/App.vue'),
        meta: { title: '积分记录', noCache: true },
      },
    ],
  },
  {
    path: '/finance',
    component: Layout,
    redirect: '/finance/pending',
    name: 'finance',
    meta: { title: '善款中心', icon: 'fa-circle', noCache: true },
    children: [
      {
        path: 'pending',
        component: () => import('../finance/pending/App.vue'),
        name: 'finance-pending',
        meta: { title: '待处理事项', noCache: true },
      },
      {
        path: 'refund',
        component: () => import('../finance/refund/App.vue'),
        name: 'finance-refund',
        meta: { title: '退款列表', noCache: true },
      },
      {
        path: 'taking/:id',
        component: () => import('../finance/taking/App.vue'),
        name: 'finance-taking',
        meta: { title: '提现账单详情', noCache: true },
        hidden: !0,
      },
      {
        path: 'stat',
        component: () => import('../finance/stat/App.vue'),
        name: 'finance-stat',
        meta: { title: '善款统计', noCache: true },
      },
      {
        path: 'summary',
        component: () => import('../finance/summary/App.vue'),
        name: 'finance-summary',
        meta: { title: '善款明细', noCache: true },
        hidden: !0,
      },
      {
        path: 'special',
        component: () => import('../finance/special/App.vue'),
        name: 'finance-special',
        meta: { title: '特殊提现', noCache: true },
        hidden: !0,
      },
      {
        path: 'receipt',
        component: () => import('../finance/receipt/App.vue'),
        name: 'finance-receipt',
        meta: { title: '发票管理', naCache: true },
      },
      {
        path: 'income-stat',
        component: () => import('../finance/income-stat/App.vue'),
        name: 'finance-income-stat',
        meta: { title: '营收统计', noCache: true },
      },
      {
        path: 'income',
        name: 'finance-income',
        component: () => import('../finance/income/App.vue'),
        meta: { title: '营收管理', noCache: true },
      },
      {
        path: 'record',
        name: 'finance-record',
        component: () => import('../finance/record/App.vue'),
        meta: { title: '人工记账', noCache: true },
      },
      {
        path: 'remark',
        name: 'finance-remark',
        component: () => import('../finance/remark/App.vue'),
        meta: { title: '提醒备注', noCache: true },
      },
      {
        path: 'trade-stat',
        name: 'finance-trade-stat',
        component: () => import('../finance/trade-stat/App.vue'),
        meta: { title: '交易统计', noCache: true },
      },
    ],
  },
  {
    path: '/cooperation',
    component: Layout,
    name: 'cooperation',
    meta: { title: '第三方项目', icon: 'fa-circle', noCache: true },
    children: [
      {
        path: '/cooperation/projectManage',
        component: () => import('../cooperation/project_manage/App.vue'),
        name: 'cooperation-projectManage',
        meta: { title: '项目管理', noCache: true },
      },
      {
        path: '/cooperation/projectManage/:id',
        component: () => import('../cooperation/project_detail/App.vue'),
        name: 'cooperation-projectManage-id',
        meta: { title: '项目详情', noCache: true },
        hidden: !0,
      },
    ],
  },
  {
    path: '/qu',
    component: Layout,
    redirect: '/qu/article',
    name: 'qu',
    meta: { title: '趣头条管理', icon: 'fa-circle', noCache: true },
    children: [
      {
        path: 'article',
        component: () => import('../qu/article/App.vue'),
        name: 'qu-article',
        meta: { title: '订阅文章列表', noCache: true },
      },
      {
        path: 'material',
        component: () => import('../qu/material/App.vue'),
        name: 'qu-material',
        meta: { title: '素材库', noCache: true },
      },
      {
        path: 'source',
        component: () => import('../qu/source/App.vue'),
        name: 'qu-source',
        meta: { title: '订阅源管理', noCache: true },
      },
    ],
  },
  {
    name: 'sl-promo',
    path: '/sl-promo',
    component: Layout,
    redirect: '/sl-promo/project',
    meta: { title: '推广管理', icon: 'fa-circle', noCache: true },
    children: [
      {
        name: 'sl-promo-project',
        path: 'project',
        component: () => import('../sl-promo/project/App.vue'),
        meta: { title: '项目管理', noCache: true },
      },
      {
        name: 'sl-promo-project-detail',
        path: 'project-detail',
        component: () => import('../sl-promo/project-detail/App.vue'),
        meta: { title: '项目详情', noCache: true },
        hidden: true,
      },
      {
        name: 'sl-promo-staff',
        path: 'staff',
        component: () => import('../sl-promo/staff/App.vue'),
        meta: { title: '人员管理', noCache: true },
      },
      {
        name: 'sl-promo-seller-detail',
        path: 'seller-detail',
        component: () => import('../sl-promo/seller-detail/App.vue'),
        meta: { title: '销售员', noCache: true },
        hidden: true,
      },
      {
        name: 'sl-promo-business-detail',
        path: 'business-detail',
        component: () => import('../sl-promo/business-detail/App.vue'),
        meta: { title: '业务员', noCache: true },
        hidden: true,
      },
    ],
  },
  {
    name: 'sl-business-promo',
    path: '/sl-business-promo',
    component: Layout,
    redirect: '/sl-business-promo/project',
    meta: { title: '推广管理', icon: 'fa-circle', noCache: true },
    children: [
      {
        name: 'sl-business-promo-project',
        path: 'project',
        component: () => import('../sl-business-promo/project/App.vue'),
        meta: { title: '项目管理', noCache: true },
      },
      {
        name: 'sl-business-promo-project-detail',
        path: 'project-detail',
        component: () => import('../sl-business-promo/project-detail/App.vue'),
        meta: { title: '项目详情', noCache: true },
        hidden: true,
      },
      {
        name: 'sl-business-promo-seller',
        path: 'seller',
        component: () => import('../sl-business-promo/seller/App.vue'),
        meta: { title: '人员管理', noCache: true },
      },
      {
        name: 'sl-business-promo-seller-detail',
        path: 'seller-detail',
        component: () => import('../sl-business-promo/seller-detail/App.vue'),
        meta: { title: '销售员', noCache: true },
        hidden: true,
      },
      {
        name: 'sl-business-promo-recruit',
        path: 'recruit',
        component: () => import('../sl-business-promo/recruit/App.vue'),
        meta: { title: '招募设置', noCache: true },
      },
      {
        path: 'topic',
        component: () => import('../sl-business-promo/topic/App.vue'),
        name: 'sl-business-promo-topic',
        meta: { title: '专题管理', noCache: true },
      },
      {
        path: 'topicEdit/:id',
        component: () => import('../sl-business-promo/topic_edit/App.vue'),
        name: 'sl-business-promo-topicEdit',
        meta: { title: '专题列表 / 编辑专题', noCache: true },
        hidden: !0,
      },
      {
        path: 'topicEditComponent/:id/:title',
        component: () =>
          import('../sl-business-promo/topic_component_edit/App'),
        name: 'sl-business-promo-topicEdit2',
        meta: { title: '专题列表 / 编辑专题 / 编辑组件', noCache: true },
        hidden: !0,
      },
      {
        path: 'topicStatistic/:id',
        component: () => import('../sl-business-promo/topic_statistic/App.vue'),
        name: 'sl-business-promo-topicStatistic',
        meta: { title: '专题列表 / 专题数据', noCache: true },
        hidden: !0,
      },
      {
        path: 'topicCreate/:id',
        component: () => import('../sl-business-promo/topic_edit/App.vue'),
        name: 'sl-business-promo-topicCreate',
        meta: { title: '专题列表 / 新建专题', noCache: true },
        hidden: !0,
      },
    ],
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/order/index',
    name: 'order',
    meta: { title: '订单管理', icon: 'fa-circle', noCache: true },
    children: [
      {
        path: '/order/templeOrderList',
        name: 'order-templeOrderList',
        meta: { title: '寺院监控' },
      },
      {
        path: '/orderManage/statisticsDetail',
        name: 'order-statisticsDetail',
        meta: { title: '订单查询' },
      },
      {
        path: 'refund',
        component: () => import('../order/refund/App.vue'),
        name: 'order-refund',
        meta: { title: '退款记录', noCache: true },
      },
    ],
  },
  {
    path: '/stat',
    component: Layout,
    name: 'stat',
    meta: { title: '数据统计', icon: 'fa-circle', noCache: true },
    children: [
      {
        name: 'stat-sum',
        path: '/stat/sum',
        meta: { title: '数据汇总' },
      },
      {
        name: 'stat-statisticsIndex',
        path: '/stat/statisticsIndex',
        meta: { title: '分析报表' },
      },
      {
        name: 'stat-statisticsIndex-module',
        path: '/stat/statisticsIndex?type=module',
        meta: { title: '模块数据' },
      },
      {
        name: 'stat-templeIndex',
        path: '/stat/templeIndex',
        meta: { title: '寺院数据' },
      },
      {
        name: 'stat-buddishData',
        path: '/stat/buddishData',
        meta: { title: '佛事数据' },
      },
      {
        name: 'stat-promoIndex',
        path: '/stat/promoIndex',
        meta: { title: '推广数据' },
      },
      {
        name: 'stat-channel',
        component: () => import('../statistics/channel/App.vue'),
        path: 'channel',
        meta: { title: '渠道统计' },
      },
      {
        path: 'detail/:channel/:channelId/:addTime',
        component: () => import('../statistics/detail/App.vue'),
        name: 'stat-detail',
        meta: { title: '渠道统计详情', noCache: true },
        hidden: !0,
      },
    ],
  },
  {
    path: '/wish',
    component: Layout,
    name: 'wish',
    meta: { title: '法师模块', icon: 'fa-circle', noCache: true },
    children: [
      {
        path: 'project',
        component: () => import('../master/project/App.vue'),
        name: 'wish-project',
        meta: { title: '加持项目', noCache: true },
      },
      {
        path: 'edit/:name',
        component: () => import('../master/edit/App.vue'),
        name: 'wish-edit',
        meta: { title: '编辑项目', noCache: true },
        hidden: !0,
      },
      {
        path: 'support-manege',
        name: 'wish-support-manege',
        component: () => import('../master/support-manege/App.vue'),
        meta: { title: '法师订单', noCache: true },
      },
      {
        name: 'wish-plus',
        path: '/wish/plus',
        meta: { title: '加持订单' },
      },
      {
        name: 'wish-master',
        path: '/wish/master',
        meta: { title: '法师管理' },
      },
      {
        name: 'wish-index',
        path: '/wish/index',
        meta: { title: '心愿管理' },
      },
      {
        name: 'wish-return',
        path: '/wish/return',
        meta: { title: '还愿管理' },
      },
      {
        name: 'wish-verify',
        path: '/wish/verify',
        meta: { title: '寺院认证' },
      },
      {
        name: 'wish-template',
        path: '/wish/template',
        meta: { title: '经咒落地页管理' },
      },
    ],
  },
  {
    path: '/buddhist',
    component: Layout,
    name: 'buddhist',
    meta: { title: '佛事管理', icon: 'fa-circle', noCache: true },
    children: [
      {
        name: 'buddhist-verify',
        path: '/buddhist/verify',
        meta: { title: '佛事审核' },
      },
      {
        name: 'buddhist-template',
        path: '/buddhist/template',
        meta: { title: '佛事模板' },
      },
      {
        name: 'buddhist-classification',
        path: '/buddhist/classification',
        meta: { title: '佛事分类' },
      },
      {
        name: 'buddhist-tag',
        path: '/buddhist/tag',
        meta: { title: '佛事标签' },
      },
    ],
  },
  {
    path: '/ad',
    component: Layout,
    name: 'ad',
    meta: { title: '广告管理', icon: 'fa-circle', noCache: true },
    children: [
      {
        name: 'ad-buddhist',
        path: '/ad/buddhist',
        meta: { title: '佛事推荐' },
      },
      {
        path: 'system-popup',
        name: 'ad-system-popup',
        component: () => import('../ad/system-popup/App.vue'),
        meta: { title: '系统广告', noCache: true },
      },
    ],
  },
  {
    path: '/buddha',
    name: 'buddha',
    meta: {
      title: '供奉管理',
      icon: 'fa-circle',
    },
    children: [
      {
        name: 'buddha-manage',
        path: '/buddha/manage',
        meta: {
          title: '供奉列表',
        },
      },
      {
        name: 'region-manage',
        path: '/region/manage',
        meta: {
          title: '区域列表',
        },
      },
    ],
  },
  {
    path: '/volunteer',
    name: 'volunteer',
    meta: {
      title: '义工管理',
      icon: 'fa-circle',
    },
    children: [
      {
        name: 'volunteer-manage',
        path: '/volunteer/manage',
        meta: {
          title: '复制弘法寺义工表单',
        },
      },
    ],
  },
  {
    path: '/help',
    name: 'help',
    meta: {
      title: '帮助中心',
      icon: 'fa-circle',
    },
    children: [
      {
        name: 'help-center',
        path: '/help/center',
        meta: {
          title: '设置帮助中心内容',
        },
      },
    ],
  },
  {
    path: '/images_manage',
    name: 'images_manage',
    meta: {
      title: '图片管理',
      icon: 'fa-circle',
    },
    children: [
      {
        name: 'images_manage-index',
        path: '/images_manage/index',
        meta: {
          title: '系统图片管理',
        },
      },
      {
        name: 'images_manage-icon',
        path: '/images_manage/icon',
        meta: {
          title: '系统图标管理',
        },
      },
    ],
  },
  {
    path: '/machine',
    name: 'machine',
    meta: {
      title: '寺院硬件',
      icon: 'fa-circle',
    },
    children: [
      {
        name: 'machine-list',
        path: '/machine/list',
        meta: {
          title: '满福屏管理',
        },
      },
      {
        name: 'machine-bottomBgList',
        path: '/machine/bottomBgList',
        meta: {
          title: '底部电子海报背景',
        },
      },
      {
        name: 'statistics-diagram',
        path: '/statistics/diagram',
        meta: {
          title: '客流统计',
        },
      },
      {
        name: 'camera-manage',
        path: '/camera/manage',
        meta: {
          title: '摄像头管理',
        },
      },
    ],
  },
  {
    path: '/buddhism',
    name: 'buddhism',
    meta: {
      title: '佛语日签',
      icon: 'fa-circle',
    },
    children: [
      {
        name: 'buddhism-language',
        path: '/buddhism/language',
        meta: {
          title: '佛语日签列表',
        },
      },
    ],
  },
  {
    path: '/vr',
    name: 'vr',
    meta: {
      title: '实境礼佛',
      icon: 'fa-circle',
    },
    children: [
      {
        name: 'vr-musicIndex',
        path: '/vr/musicIndex',
        meta: {
          title: '音乐管理',
        },
      },
    ],
  },
  {
    path: '/oprule',
    name: 'oprule',
    meta: {
      title: '用户管理',
      icon: 'fa-circle',
    },
    children: [
      {
        name: 'oprule-group',
        path: '/oprule/group',
        meta: {
          title: '用户分群',
        },
      },
      {
        name: 'oprule-treat',
        path: '/oprule/treat',
        meta: {
          title: '运营策略',
        },
      },
    ],
  },
];
