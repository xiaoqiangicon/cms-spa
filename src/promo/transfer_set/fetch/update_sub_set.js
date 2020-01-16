import seeFetch from 'see-fetch';

const req = {
  // subId: 'subId',
  shareFuBiPercent: 'blessCoinPercentage',
};

const pre = params => ({
  ...params,
});

seeFetch.config('promo/transfer_set_/update_sub_set', {
  method: ['post'],
  stringify: [!0],
  url: [
    'conversionOrder/updateBlessCoinShare',
    '/promo/transfer_set/mock/success',
    '/promo/transfer_set/mock/success',
  ],
  req: [req, req],
  pre: [pre, pre],
});
