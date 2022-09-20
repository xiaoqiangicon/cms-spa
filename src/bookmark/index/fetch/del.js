/* eslint-disable no-param-reassign, prefer-destructuring, no-nested-ternary */
import seeFetch from 'see-fetch';

seeFetch.config('bookmark/index/del', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/sign/delSign',
    '/bookmark/index/mock/add',
    '/bookmark/index/mock/add',
  ],
});
