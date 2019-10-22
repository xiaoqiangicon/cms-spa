/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

seeFetch.config('master/project/delete', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/order/getRefundOrderList',
    '/master/project/mock/del',
    '/master/project/mock/del',
  ],
});
