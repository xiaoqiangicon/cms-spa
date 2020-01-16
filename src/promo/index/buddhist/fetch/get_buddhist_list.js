import seeFetch from 'see-fetch';

const req = {
  // templeId: 'templeId',
};

const refactor = {
  data: {
    total: 'count',
    list: [
      {
        // id: 'id',
        // name: 'name',
        // isPromotion: 'isPromotion',
      },
    ],
  },
};

const pre = params => ({
  ...params,
  isFinish: 0,
  isTest: 1,
  pageNumber: 0,
  pageSize: 10000,
});

seeFetch.config('promo/index/buddhist/getBuddhistList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/ceremony/list',
    '/promo/index/buddhist/mock/get_buddhist_list',
    '/promo/index/buddhist/mock/get_buddhist_list',
  ],
  req: [req, req],
  pre: [pre, pre],
  refactor: [refactor, refactor],
});
