/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

seeFetch.config('purchase/enter/checkContent', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/purchasing/checkContent',
    '/purchase/enter/mock/checkExpressNo',
    '/purchase/enter/mock/checkExpressNo',
  ],
});
