import seeFetch from 'see-fetch';

// isAuto 1 不可撤回
// isAuto 0 isFinish 不可撤回

const req = {
  // orderId: 'orderId',
};

seeFetch.config('promo/index/transfer/retract', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/conversionOrder/repealConversionOrder',
    '/promo/index/transfer/mock/success',
    '/promo/index/transfer/mock/success',
  ],
  req: [req, req],
});
