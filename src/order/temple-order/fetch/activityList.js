import seeFetch from 'see-fetch';

seeFetch.config('order/templeOrder/activityList', {
  method: ['post'],
  stringify: [true],
  url: [
    '/ceremony/list',
    '/src/order/temple-order/mock/activityList',
    '/src/order/temple-order/mock/activityList',
  ],
});
