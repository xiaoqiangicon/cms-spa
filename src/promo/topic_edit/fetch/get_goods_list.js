import seeFetch from 'see-fetch';

const req = {};

const pre = params => ({
  ...params,
  isFinish: 0,
  isTest: 1,
  pageNumber: 0,
  pageSize: 1000,
  status: 0,
});

const refactor = {
  data: 'data.list',
};

seeFetch.config('promo/topicEdit/getGoodsList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/ceremony/list/',
    '/promo/topic_edit/mock/get_goods_list',
    '/promo/topic_edit/mock/get_goods_list',
  ],
  req: [req, req],
  pre: [pre, pre],
  refactor: [refactor, refactor],
});
