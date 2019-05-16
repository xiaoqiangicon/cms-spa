import seeFetch from 'see-fetch';

const req = {
  id: 'subdivideId',
};

seeFetch.config('promo/merge_set/delete', {
  method: ['post'],
  stringify: [!0, !0],
  url: [
    '/conversionOrder/delConversionSubdivide',
    '/promo/merge_set/mock/success',
    '/promo/merge_set/mock/success',
  ],
  req: [req, req],
});
