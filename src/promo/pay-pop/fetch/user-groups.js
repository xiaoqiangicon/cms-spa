/* eslint-disable no-param-reassign */
import seeFetch from 'see-fetch';

seeFetch.config('promo/pay-pop/userGroups', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/oprule/list',
    '/promo/pay-pop/mock/userGroups1',
    '/promo/pay-pop/mock/userGroups',
  ],
});
