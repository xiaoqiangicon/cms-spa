/* eslint-disable no-param-reassign, prefer-destructuring, no-nested-ternary */
import seeFetch from 'see-fetch';

seeFetch.config('buddhist/order/getCommodityList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/ceremony/cacheList/',
    '/buddhist/classify/mock/getCommodityList',
    '/buddhist/classify/mock/getCommodityList',
  ],
});
