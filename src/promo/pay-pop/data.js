export const addProps = [
  { name: 'isUpdate', full: !1, default: !1 },
  { name: 'updateId', full: !1, default: 0 },
  { name: 'dialogTitle', full: !1, default: '添加' },
  { name: 'visible', full: !0, default: !1 },
  // 标题
  { name: 'title', full: !0, default: '' },
  // 封面
  { name: 'covers', full: !0, default: () => [] },
  // 开始时间
  { name: 'takeEffectTimeRange', full: !0, default: () => [] },
  // 排序（越大越靠前）
  { name: 'sort', full: !0, default: '' },
  // 跳转链接
  { name: 'redirect', full: !0, default: '' },
  // 是否是H5链接, '1'不是,'2'是
  { name: 'isLink', full: !1, default: '1' },
  // 模块
  { name: 'moduleId', full: !0, default: 0 },
  // 模块内容ID（0表示全部）
  { name: 'moduleContentId', full: !0, default: 0 },
  // 最少金额
  { name: 'minAmount', full: !0, default: '' },
  // 最大金额
  { name: 'maxAmount', full: !0, default: '' },
  // 精细化运营用户分组（0表示全部）
  { name: 'userGroupId', full: !0, default: 0 },
  // 是否已经注册app（0：不限制，1：已经注册，2：没有注册）
  { name: 'registerApp', full: !0, default: 0 },
  // 用户注册多少天（0表示当天）
  { name: 'registeredDays', full: !0, default: '' },
  // 支付环境（0：不限制，1：app，2：微信）
  { name: 'payEnv', full: !0, default: 0 },
  // 是否只显示一次（1：是，0：否）
  { name: 'showOnce', full: !0, default: 0 },
];

export default {};
