/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

seeFetch.config('order/refund/refund', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/order/verifyRefundOrder',
    '/order/refund/mock/refund',
    '/order/refund/mock/refund',
  ],
});
