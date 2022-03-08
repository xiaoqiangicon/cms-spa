/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

seeFetch.config('order/watch/list', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/temple/templeOrderList',
    '/order/watch/mock/list',
    '/order/watch/mock/list',
  ],
});
