import seeFetch from 'see-fetch';

const req = {
  subId: 'subdivideId',
  mergeList: 'conversionSubdivide',
  _mergeList: [
    {
      // templeId: 'templeId',
      buddhistId: 'commodityId',
      subId: 'subdivideId',
      // price: 'price',
    },
  ],
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
