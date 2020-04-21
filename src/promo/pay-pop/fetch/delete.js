import seeFetch from 'see-fetch';

const pre = req => ({ ...req, status: -1 });

seeFetch.config('promo/pay-pop/delete', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/op/editOpWindows',
    '/promo/pay-pop/mock/del1',
    '/promo/pay-pop/mock/del',
  ],
  pre: [pre, pre],
});
