import seeFetch from 'see-fetch';

const req = {
  // 封面
  cover: 'pic',
  // 开始时间
  startTime: 'startDate',
  // 结束时间
  endTime: 'endDate',
  // 跳转链接
  redirect: 'url',
  // 模块（0: 全部, 1: 佛事, 2: 千寺祈福, 3: 日行一善, 4: 法师加持, 5: 法师供养, 6: 功德箱）
  moduleId: 'moudelType',
  // 模块内容ID（0表示全部）
  moduleContentId: 'moudelId',
  // 最少金额
  startAmount: 'startMoney',
  // 最大金额
  endAmount: 'endMoney',
  // 是否已经注册app（0：不限制，1：已经注册，2：没有注册）
  registerApp: 'isRegisterApp',
  // 用户注册多少天（0表示当天）
  registeredDays: 'registerDay',
  // 支付环境（0：不限制，1：app，2：微信）
  payEnv: 'payType',
  // 是否只显示一次（1：是，0：否）
  showOnce: 'isClick',
  // 点击数
  clickCount: 'clickNum',
  // 关闭数
  closeCount: 'closeNum',
};

seeFetch.config('promo/pay-pop/add', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/op/editOpWindows',
    '/promo/pay-pop/mock/add1',
    '/promo/pay-pop/mock/add',
  ],
  req: [req, req],
});
