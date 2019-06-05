import seeFetch from 'see-fetch';

const req = {
  // templeId: 'templeId',
  buddhistId: 'contentId',
};

const pre = params => ({
  ...params,
  type: 2, // 佛事
});

const refactor = {
  data: [
    {
      // rate: 'rate',
      // startTime: 'startTime',
      updateTime: 'addTime',
      updateUser: 'managerName',
    },
  ],
};

const post = () => {};

seeFetch.config('promo/index/buddhist/getRecordList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/rate/recordList',
    '/promo/index/buddhist/mock/get_record_list',
    '/promo/index/buddhist/mock/get_record_list',
  ],
  req: [req, req],
  pre: [pre, pre],
  refactor: [refactor, refactor],
  post: [post, post],
});
