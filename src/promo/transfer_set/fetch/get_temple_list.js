import seeFetch from 'see-fetch';

const req = {};

const refactor = {
  data: [
    {
      id: 'templeId',
      name: 'templeName',
    },
  ],
};

seeFetch.config('promo/transfer_set/getTempleList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/conversionOrder/getTempleList',
    '/promo/transfer_set/mock/get_temple_list',
    '/promo/transfer_set/mock/get_temple_list',
  ],
  req: [req, req],
  refactor: [refactor, refactor],
});
