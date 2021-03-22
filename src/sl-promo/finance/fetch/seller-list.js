/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';
import { safeFloat } from '../../../../../pro-com/src/utils';

const refactor = {
  data: {
    list: [
      {
        // 总收入
        totalIncome: 'money',
        createTime: 'addTime',
      },
    ],
  },
};

const post = res => {
  if (res.data && res.data.list) {
    res.data.list.forEach(item => {
      item.totalIncome = safeFloat(item.totalIncome || 0) || 0;
    });
  }
};

seeFetch.config('sl-promo/finance/sellerList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/cooperation/getSellerPickUpList',
    '/sl-promo/finance/mock/sellerListS',
    '/sl-promo/finance/mock/sellerList',
  ],
  refactor: [refactor, refactor],
  post: [post, post],
});
