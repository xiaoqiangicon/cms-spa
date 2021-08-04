import seeFetch from 'see-fetch';

const req = {
  // templeId: 'templeId',
  buddhistId: 'contentId',
};

seeFetch.config('promo/index/buddhist/verify', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/rate/verifyRate',
    '/promo/index/buddhist/mock/success',
    '/promo/index/buddhist/mock/success',
  ],
  req: [req, req],
});
