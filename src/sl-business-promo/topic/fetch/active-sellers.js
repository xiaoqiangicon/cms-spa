import seeFetch from 'see-fetch';

const pre = params => ({ ...params, type: 2 });

seeFetch.config('sl-business-promo/topic/activeSellers', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/topic/cooperationSellerList',
    '/sl-business-promo/topic/mock/activeSellersS',
    '/sl-business-promo/topic/mock/activeSellers',
  ],
  pre: [pre, pre],
});
