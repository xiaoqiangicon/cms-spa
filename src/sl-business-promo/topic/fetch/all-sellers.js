import seeFetch from 'see-fetch';

const pre = params => ({ ...params, type: 0 });

seeFetch.config('sl-business-promo/topic/allSellers', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/topic/cooperationSellerList',
    '/sl-business-promo/topic/mock/allSellersS',
    '/sl-business-promo/topic/mock/allSellers',
  ],
  pre: [pre, pre],
});
