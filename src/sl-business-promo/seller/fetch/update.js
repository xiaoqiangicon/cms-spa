/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

const req = {
  id: 'sellerId',
  reason: 'content',
};

seeFetch.config('sl-business-promo/seller/update', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/cooperation/updateSellerStatus',
    '/sl-business-promo/seller/mock/updateS',
    '/sl-business-promo/seller/mock/update',
  ],
  req: [req, req],
});
