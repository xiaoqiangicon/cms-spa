import seeFetch from 'see-fetch';

const req = {
  buddhistId: 'commodityId',
  // sort: 'sort',
};

seeFetch.config('promo/index/fu/update_sort', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/blessCoinShop/updateBlessCoinShareSort',
    '/promo/index/fu/mock/success',
    '/promo/index/fu/mock/success',
  ],
  req: [req, req],
});
