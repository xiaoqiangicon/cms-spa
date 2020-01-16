import seeFetch from 'see-fetch';

const req = {
  // templeId: 'templeId',
  // userId: 'userId',
};

seeFetch.config('promo/statistics/updateManagerList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/conversionOrder/addConversionOrderPush',
    '/promo/statistics/mock/success',
    '/promo/statistics/mock/success',
  ],
  req: [req, req],
});
