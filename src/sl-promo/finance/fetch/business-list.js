/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';
import { safeFloat } from '../../../../../pro-com/src/utils';

const refactor = {
  data: [
    {
      id: 'businessId',
      // 用户名
      name: 'businessName',
      // 总订单数
      totalOrders: 'orderNum',
      // 总销售额
      totalAmount: 'orderMoney',
      // 总收入
      totalIncome: 'businessMoney',
    },
  ],
};

const post = res => {
  if (res.data) {
    res.data.forEach(item => {
      item.totalAmount = safeFloat(item.totalAmount || 0) || 0;
      item.totalIncome = safeFloat(item.totalIncome || 0) || 0;
    });
  }
};

seeFetch.config('sl-promo/finance/businessList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/cooperation/getBusinessUserStatement',
    '/sl-promo/finance/mock/businessListS',
    '/sl-promo/finance/mock/businessList',
  ],
  refactor: [refactor, refactor],
  post: [post, post],
});
