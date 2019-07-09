import seeFetch from 'see-fetch';

const req = {
  // images: 'images',
  // remark: 'remark',
  // productNum: 'productNum',
};

const pre = params => ({
  ...params,
  images: params.images.join(','),
});

seeFetch.config('promo/ci/list/handle', {
  method: ['post'],
  stringify: [!0],
  url: ['/', '/promo/ci/list/mock/success', '/promo/ci/list/mock/success'],
  req: [req, req],
  pre: [pre, pre],
});
