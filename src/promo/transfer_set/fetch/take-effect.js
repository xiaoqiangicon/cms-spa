import seeFetch from 'see-fetch';

const req = {
  selectionId: 'subdivideId',
  checked: 'status',
};

seeFetch.config('promo/transfer_set/takeEffect', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/conversionOrder/reviewConversionSubdivide',
    '/promo/transfer_set/mock/takeEffect1',
    '/promo/transfer_set/mock/takeEffect',
  ],
  req: [req, req],
});
