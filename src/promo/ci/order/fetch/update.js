import seeFetch from 'see-fetch';

seeFetch.config('promo/ci/order/update', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/event/charitableProcessOrder',
    '/promo/ci/order/mock/success',
    '/promo/ci/order/mock/success',
  ],
});
