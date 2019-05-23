import seeFetch from 'see-fetch';

const req = {
  // sort: 'sort',
};

seeFetch.config('promo/index/fu/update_sort', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/wish/wishGiftList',
    '/promo/index/fu/mock/success',
    '/promo/index/fu/mock/success',
  ],
  req: [req, req],
});
