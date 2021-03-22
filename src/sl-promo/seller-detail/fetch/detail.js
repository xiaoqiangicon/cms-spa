/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';
import { safeFloat } from '../../../../../pro-com/src/utils';

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
    totalIncome: 'earning',
    createTime: 'addTime',
  },
};

const post = res => {
  if (res.data) {
    res.data.totalAmount = safeFloat(res.data.totalAmount || 0) || 0;
    res.data.totalIncome = safeFloat(res.data.totalIncome || 0) || 0;
  }
};

seeFetch.config('sl-promo/seller-detail/detail', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/cooperation/getSellerUserMessage',
    '/sl-promo/seller-detail/mock/detailS',
    '/sl-promo/seller-detail/mock/detail',
  ],
  refactor: [refactor, refactor],
  post: [post, post],
});
