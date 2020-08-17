/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

const req = {
  id: 'sellerId',
  reason: 'content',
};

seeFetch.config('sl-promo/staff/updateSeller', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/cooperation/updateSellerStatus',
    '/sl-promo/staff/mock/updateSellerS',
    '/sl-promo/staff/mock/updateSeller',
  ],
  req: [req, req],
});
