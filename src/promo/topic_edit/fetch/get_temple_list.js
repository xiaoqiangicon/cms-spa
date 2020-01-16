import seeFetch from 'see-fetch';

const req = {};

const refactor = {
  data: [
    {
      // id: 'id',
      // name: 'name',
    },
  ],
};

const pre = params => ({
  ...params,
  isTest: 1,
  tagId: 0,
  verify: -1,
});

seeFetch.config('promo/topicEdit/getTempleList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/temple/list',
    '/promo/topic_edit/mock/get_temple_list',
    '/promo/topic_edit/mock/get_temple_list',
  ],
  req: [req, req],
  pre: [pre, pre],
  refactor: [refactor, refactor],
});
