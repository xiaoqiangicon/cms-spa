import seeFetch from 'see-fetch';

const req = {
  // templeId: 'templeId',
  buddhistId: 'contentId',
};

const pre = params => ({
  ...params,
  isEnd: 1,
  type: 2, // 佛事
});

seeFetch.config('promo/index/buddhist/withdraw', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/rate/updateEnd',
    '/promo/index/buddhist/mock/success',
    '/promo/index/buddhist/mock/success',
  ],
  req: [req, req],
  pre: [pre, pre],
});
