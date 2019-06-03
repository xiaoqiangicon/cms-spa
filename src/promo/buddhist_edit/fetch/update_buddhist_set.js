import seeFetch from 'see-fetch';

const req = {
  // templeId: 'templeId',
  buddhistId: 'contentId',
  // rate: 'rate',
  // startTime: 'startTime',
};

const pre = params => ({
  ...params,
  isEnd: 1,
  type: 2, // 佛事
});

seeFetch.config('promo/buddhist_edit/update_buddhist_set', {
  method: ['post'],
  stringify: [!0],
  url: [
    'rate/updateRate',
    '/promo/buddhist_edit/mock/success',
    '/promo/buddhist_edit/mock/success',
  ],
  req: [req, req],
  pre: [pre, pre],
});
