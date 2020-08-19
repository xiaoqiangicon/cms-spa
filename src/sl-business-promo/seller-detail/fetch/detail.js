/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

const refactor = {
  data: {
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
};

seeFetch.config('sl-business-promo/seller-detail/detail', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/cooperation/getSellerUserMessage',
    '/sl-business-promo/seller-detail/mock/detailS',
    '/sl-business-promo/seller-detail/mock/detail',
  ],
  refactor: [refactor, refactor],
});
