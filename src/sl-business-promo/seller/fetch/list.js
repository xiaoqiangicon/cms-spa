/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';
import { safeFloat } from '../../../../../pro-com/src/utils';

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
        totalIncome: 'earning',
        createTime: 'addTime',
      },
    ],
  },
};

const post = res => {
  if (res.data && res.data.list) {
    res.data.list.forEach(item => {
      item.totalAmount = safeFloat(item.totalAmount || 0) || 0;
      item.totalIncome = safeFloat(item.totalIncome || 0) || 0;
    });
  }
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
  post: [post, post],
});
