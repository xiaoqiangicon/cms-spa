/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

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

seeFetch.config('sl-promo/finance/sellerList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/cooperation/getSellerPickUpList',
    '/sl-promo/finance/mock/sellerListS',
    '/sl-promo/finance/mock/sellerList',
  ],
  refactor: [refactor, refactor],
});
