/* eslint-disable no-param-reassign, prefer-destructuring, no-nested-ternary */
import seeFetch from 'see-fetch';

seeFetch.config('bookmark/index/list', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/sign/getSignList',
    '/bookmark/index/mock/list',
    '/bookmark/index/mock/list',
  ],
});
