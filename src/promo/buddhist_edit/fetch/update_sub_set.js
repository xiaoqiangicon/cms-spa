import seeFetch from 'see-fetch';

const req = {
  // subId: 'subId',
  shareFuBiPercent: 'blessCoinPercentage',
};

const pre = params => ({
  ...params,
});

seeFetch.config('promo/buddhist_edit/update_sub_set', {
  method: ['post'],
  stringify: [!0],
  url: [
    'conversionOrder/updateBlessCoinShare',
    '/promo/buddhist_edit/mock/success',
    '/promo/buddhist_edit/mock/success',
  ],
  req: [req, req],
  pre: [pre, pre],
});
