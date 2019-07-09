import seeFetch from 'see-fetch';

const req = {
  // id
  // content
  images: 'img',
  ifPush: 'isPush',
};

const pre = params => ({
  ...params,
  img: params.img.join(','),
});

seeFetch.config('promo/ci/dynamic/update', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/event/addOrUpdatecharitableSchedule',
    '/promo/ci/dynamic/mock/success',
    '/promo/ci/dynamic/mock/success',
  ],
  req: [req, req],
  pre: [pre, pre],
});
