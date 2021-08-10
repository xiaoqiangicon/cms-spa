/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

seeFetch.config('order/refund/cancelRefund', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/order/cancelRefundOrder',
    '/order/refund/mock/refund',
    '/order/refund/mock/refund',
  ],
});
