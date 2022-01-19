/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

seeFetch.config('purchase/info/list', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/purchasing/projectPage',
    '/purchase/info/mock/list',
    '/purchase/info/mock/list',
  ],
});
