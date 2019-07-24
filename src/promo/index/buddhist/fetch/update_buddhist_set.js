import seeFetch from 'see-fetch';

const req = {
  // templeId: 'templeId',
  buddhistId: 'contentId',
  // isPickUpCommodity
};

const pre = params => ({
  ...params,
  isEnd: 1,
  type: 2, // 佛事
  isPickUpCommodity: Number(params.isPickUpCommodity),
});

seeFetch.config('promo/index/buddhist/updateCanCash', {
  method: ['post'],
  stringify: [!0],
  url: [
    'rate/updateRate',
    '/promo/index/buddhist/mock/success',
    '/promo/index/buddhist/mock/success',
  ],
  req: [req, req],
  pre: [pre, pre],
});
