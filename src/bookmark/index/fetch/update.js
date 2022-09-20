/* eslint-disable no-param-reassign, prefer-destructuring, no-nested-ternary */
import seeFetch from 'see-fetch';

seeFetch.config('bookmark/index/update', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/sign/updateSign',
    '/bookmark/index/mock/add',
    '/bookmark/index/mock/add',
  ],
});
