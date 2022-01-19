/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

seeFetch.config('purchase/enter/checkExpressNo', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/purchasing/checkExpressNo',
    '/purchase/enter/mock/checkExpressNo',
    '/purchase/enter/mock/checkExpressNo',
  ],
});
