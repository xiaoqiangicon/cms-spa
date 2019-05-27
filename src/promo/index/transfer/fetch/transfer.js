import seeFetch from 'see-fetch';

const req = {
  buddhistId: 'commodityId',
  // templeId: 'templeId',
  // orderIds: 'orderIds',
  // price: 'price',
  // percent: 'percent',
};

const pre = params => ({
  ...params,
  orderIds: JSON.stringify(params.orderIds),
});

seeFetch.config('promo/index/transfer/transfer', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/conversionOrder/conversionOrder',
    '/promo/index/transfer/mock/success',
    '/promo/index/transfer/mock/success',
  ],
  req: [req, req],
  pre: [pre, pre]
});
