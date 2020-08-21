/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

seeFetch.config('sl-promo/finance/allBusiness', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/cooperation/getBusinessUserList',
    '/sl-promo/finance/mock/allBusinessS',
    '/sl-promo/finance/mock/allBusiness',
  ],
});
