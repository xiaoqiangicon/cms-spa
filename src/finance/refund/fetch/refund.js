/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

seeFetch.config('finance/refund/refund', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/order/refundOrder',
    '/finance/refund/mock/refund',
    '/finance/refund/mock/refund',
  ],
});
