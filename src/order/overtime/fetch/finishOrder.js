/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

seeFetch.config('order/overtime/finish', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/order/finishOrder',
    '/order/overtime/mock/finish',
    '/order/overtime/mock/finish',
  ],
});
