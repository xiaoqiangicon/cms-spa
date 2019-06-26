import seeFetch from 'see-fetch';

const req = {};

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
  refactor: [refactor, refactor],
});
