/* eslint-disable no-param-reassign, prefer-destructuring, no-nested-ternary */
import seeFetch from 'see-fetch';
import { makeTotal } from '../util';

const req = {
  id: 'pickUpId',
  showType: 'type',
};

const refactor = {
  data: {
    account: 'bank',
    _account: {
      // 支行名称
      subBankName: 'bankBranchName',
      // 银行开户名称
      accountName: 'bankCardUserName',
      // 银行卡号
      accountNumber: 'bankCardNumber',
    },
    // 打赏
    platformSupport: 'reward',
    // 特殊提现手续费
    specialCharge: 'specialPickUpMoney',
    // 回单照片
    feedbackImages: 'picList',
    dateItems: 'pickUpMoneyList',
    _dateItems: [
      {
        date: 'month',
        orders: 'pickUpList',
        _orders: [
          {
            title: 'name',
            // 数量
            count: 'order_num',
            // 金额
            amount: 'price',
            // 增值服务费
            increaseCharge: 'percentMoney',
            // 渠道服务费
            channelCharge: 'counter_fee',
            // 渠道服务费补贴
            channelSubsidy: 'subsidy_counter_fee',
            // 功能服务费
            functionCharge: 'serviceMoney',
            // 推广员奖励金
            promoterReward: 'promotionMoney',
          },
        ],
      },
    ],
  },
};

const post = res => {
  if (res.data && res.data.dateItems) {
    makeTotal(res.data);
  }
};

const postLocal = res => {
  makeTotal(res.data);
};

seeFetch.config('finance/taking/orders', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/finance/getPickUpDetails',
    '/finance/taking/mock/orders1',
    '/finance/taking/mock/orders',
  ],
  req: [req, req],
  refactor: [refactor, refactor],
  post: [post, post, postLocal],
});
