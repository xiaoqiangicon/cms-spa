/* eslint-disable no-param-reassign */
import seeFetch from 'see-fetch';
import { numOfDateTime, now } from '../../../../../pro-com/src/utils';

const req = {
  expire: 'isValid',
  page: 'pageNo',
};

const pre = params => ({ ...params, pageSize: 10 });

const refactor = {
  totalCount: 'data.total',
  data: 'data.list',
  _data: [
    {
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
      minAmount: 'startMoney',
      // 最大金额
      maxAmount: 'endMoney',
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
    },
  ],
};

const post = res => {
  if (res.data) {
    const nowNum = numOfDateTime(now.dateTime);
    res.data.forEach(item => {
      // timeStatus(1：进行中，2：未开始，3：已结束)
      if (item.startTime && item.endTime) {
        const startTimeNum = numOfDateTime(item.startTime);
        const endTimeNum = numOfDateTime(item.endTime);

        if (nowNum > endTimeNum) item.timeStatus = 3;
        else if (nowNum < startTimeNum) item.timeStatus = 2;
        else item.timeStatus = 1;
      } else if (item.startTime) {
        const startTimeNum = numOfDateTime(item.startTime);

        if (nowNum < startTimeNum) item.timeStatus = 2;
        else item.timeStatus = 1;
      } else if (item.endTime) {
        const endTimeNum = numOfDateTime(item.endTime);

        if (nowNum > endTimeNum) item.timeStatus = 3;
        else item.timeStatus = 1;
      }
    });
  }
};

seeFetch.config('promo/pay-pop/list', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/op/getOpWindowsList',
    '/promo/pay-pop/mock/list1',
    '/promo/pay-pop/mock/list',
  ],
  req: [req, req],
  pre: [pre, pre],
  refactor: [refactor, refactor],
  post: [post, post, post],
});
