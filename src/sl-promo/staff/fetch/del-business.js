/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

seeFetch.config('sl-promo/staff/delBusiness', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/cooperation/delBusinessUser',
    '/sl-promo/staff/mock/delBusiness1',
    '/sl-promo/staff/mock/delBusiness',
  ],
});
