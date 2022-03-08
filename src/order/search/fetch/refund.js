import seeFetch from 'see-fetch';

seeFetch.config('order/search/refund', {
  method: ['post'],
  stringify: [!0],
  url: ['/order/verifyRefundOrder', '/refund1', '/refund'],
});
