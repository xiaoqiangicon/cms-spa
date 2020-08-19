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
        businessUserName: 'businessUser.name',
        businessUser: {
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
      },
    ],
  },
};

seeFetch.config('sl-promo/staff/sellerList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/cooperation/getSellerList',
    '/sl-promo/staff/mock/sellerListS',
    '/sl-promo/staff/mock/sellerList',
  ],
  req: [req, req],
  refactor: [refactor, refactor],
});
