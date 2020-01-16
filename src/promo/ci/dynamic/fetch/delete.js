import seeFetch from 'see-fetch';

const req = {
  // id
};

const pre = params => ({
  ...params,
  status: -1,
});

seeFetch.config('promo/ci/dynamic/delete', {
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
