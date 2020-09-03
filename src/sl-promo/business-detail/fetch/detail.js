/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';
import { safeFloat } from '../../../../../pro-com/src/utils';

const refactor = {
  data: {
    phone: 'mobile',
    // 总订单数
    totalOrders: 'orderNum',
    // 总销售额
    totalAmount: 'sales',
    // 总收入
    totalIncome: 'earning',
    // 销售员总收入
    sellersTotalIncome: 'sellerEarning',
    // 旗下销售员
    totalSellers: 'sellerNum',
    createTime: 'addTime',
  },
};

const post = res => {
  if (res.data) {
    res.data.totalAmount = safeFloat(res.data.totalAmount || 0) || 0;
    res.data.totalIncome = safeFloat(res.data.totalIncome || 0) || 0;
    res.data.sellersTotalIncome =
      safeFloat(res.data.sellersTotalIncome || 0) || 0;
  }
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
  post: [post, post],
});
