import seeFetch from 'see-fetch';

const req = {
  buddhistId: 'commodityId',
  // subList: 'subList',
};

seeFetch.config('promo/index/transfer/addBuddhist', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/conversionOrder/addCommodity2ConversionOrder',
    '/promo/index/transfer/mock/success',
    '/promo/index/transfer/mock/success',
  ],
  req: [req, req],
});
