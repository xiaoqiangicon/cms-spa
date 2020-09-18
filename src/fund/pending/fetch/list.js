/* eslint-disable no-param-reassign, prefer-destructuring, no-nested-ternary */
import seeFetch from 'see-fetch';

seeFetch.config('fund/pending/list', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/video/getPickUpList',
    '/fund/pending/mock/list',
    '/fund/pending/mock/list',
  ],
});
