import seeFetch from 'see-fetch';

const req = {
  // images
  // content
  // ifShow
};

const pre = params => ({
  ...params,
  images: params.images.join(','),
});

seeFetch.config('promo/ci/dynamic/update', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/',
    '/promo/ci/dynamic/mock/success',
    '/promo/ci/dynamic/mock/success',
  ],
  req: [req, req],
  pre: [pre, pre],
});
