/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

const req = {
  keyword: 'content',
  sort: 'orderByType',
};

const refactor = {
  data: {
    list: [
      {
        phone: 'mobile',
        // 总订单数
        totalOrders: 'orderNum',
        // 总销售额
        totalAmount: 'sales',
        // 总收入
        totalIncome: 'sellerEarning',
        createTime: 'addTime',
      },
    ],
  },
};

seeFetch.config('sl-promo/staff/businessList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/cooperation/getBusinessUserList',
    '/sl-promo/staff/mock/businessList1',
    '/sl-promo/staff/mock/businessList',
  ],
  req: [req, req],
  refactor: [refactor, refactor],
});
