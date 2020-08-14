/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

const req = {
  phone: 'mobile',
};

seeFetch.config('sl-promo/staff/updateBusiness', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/cooperation/addAndUpdateBusinessUser',
    '/sl-promo/staff/mock/updateBusiness1',
    '/sl-promo/staff/mock/updateBusiness',
  ],
  req: [req, req],
});
