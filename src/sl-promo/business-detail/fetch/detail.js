/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

const refactor = {
  data: {
    phone: 'mobile',
    // 总订单数
    totalOrders: 'orderNum',
    // 总销售额
    totalAmount: 'sales',
    // 总收入
    totalIncome: 'sellerEarning',
    // 旗下销售员
    totalSellers: 'sellerNum',
    createTime: 'addTime',
  },
};

seeFetch.config('sl-promo/business-detail/detail', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/cooperation/getBusinessUserMessage',
    '/sl-promo/business-detail/mock/detailS',
    '/sl-promo/business-detail/mock/detail',
  ],
  refactor: [refactor, refactor],
});
