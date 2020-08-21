/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

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

seeFetch.config('sl-promo/finance/businessList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/cooperation/getBusinessUserStatement',
    '/sl-promo/finance/mock/businessListS',
    '/sl-promo/finance/mock/businessList',
  ],
  refactor: [refactor, refactor],
});
