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
        phone: 'mobile',
        // 总订单数
        totalOrders: 'orderNum',
        // 总销售额
        totalAmount: 'sales',
        // 总收入
        totalIncome: 'earning',
        // 旗下销售员
        totalSellers: 'sellerNum',
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

seeFetch.config('sl-promo/staff/businessList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/cooperation/getBusinessUserList',
    '/sl-promo/staff/mock/businessListS',
    '/sl-promo/staff/mock/businessList',
  ],
  req: [req, req],
  refactor: [refactor, refactor],
  post: [post, post],
});
