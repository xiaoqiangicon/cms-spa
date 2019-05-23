import seeFetch from 'see-fetch';

const req = {};

const refactor = {
  data: [{
    id: 'templeId',
    name: 'templeName',
  }],
};

seeFetch.config('promo/statistics/getTempleList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/conversionOrder/getRelatingTempleNameList',
    '/promo/statistics/mock/get_temple_list',
    '/promo/statistics/mock/get_temple_list',
  ],
  req: [req, req],
  refactor: [refactor, refactor],
});
