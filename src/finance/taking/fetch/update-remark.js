/* eslint-disable no-param-reassign, prefer-destructuring, no-nested-ternary */
import seeFetch from 'see-fetch';

seeFetch.config('finance/taking/updateRemark', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/cashMemo/updateStatus',
    '/finance/taking/mock/updateRemark1',
    '/finance/taking/mock/updateRemark',
  ],
});
