import seeFetch from 'see-fetch';

const req = {
  // orderId: 'orderId',
  images: 'img',
  remark: 'content',
  productNum: 'produce',
};

const pre = params => ({
  ...params,
  img: params.img.join(','),
});

seeFetch.config('promo/ci/list/handle', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/event/charitableFeedbackOrder',
    '/promo/ci/list/mock/success',
    '/promo/ci/list/mock/success',
  ],
  req: [req, req],
  pre: [pre, pre],
});
