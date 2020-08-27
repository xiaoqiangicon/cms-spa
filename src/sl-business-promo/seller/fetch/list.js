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
        // 昵称
        nickname: 'nickName',
        // 用户头像
        avatar: 'headImg',
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

seeFetch.config('sl-business-promo/seller/list', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/cooperation/getSellerList',
    '/sl-business-promo/seller/mock/listS',
    '/sl-business-promo/seller/mock/list',
  ],
  req: [req, req],
  refactor: [refactor, refactor],
});
