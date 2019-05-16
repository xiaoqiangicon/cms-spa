import seeFetch from 'see-fetch';

const req = {
  // subdivideId: 'subdivideId',
  mergeSub: 'conversionSubdivide',
};

seeFetch.config('promo/merge_set/update', {
  method: ['post'],
  stringify: [!0, !0],
  url: [
    '/conversionOrder/addAndUpdateConversionSubdivide',
    '/promo/merge_set/mock/success',
    '/promo/merge_set/mock/success',
  ],
  req: [req, req],
});
