/* eslint-disable no-param-reassign, prefer-destructuring, no-nested-ternary */
import seeFetch from 'see-fetch';

seeFetch.config('buddhist/order/feedback', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/order/verifyFeedback',
    '/buddhist/order/mock/feedback',
    '/buddhist/order/mock/feedback',
  ],
});
