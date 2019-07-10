import seeFetch from 'see-fetch';

const req = {
  page: 'pageNum',
  // pageSize: 'pageSize',
};

const pre = params => ({
  ...params,
  pageNum: params.pageNum - 1,
});

const refactor = {
  data: {
    total: 'count',
    list: [
      {
        // id: 'id',
        // nickname: 'nickname',
        // name: 'name',
        tel: 'phone',
        // oldUser: 'oldUser',
      },
    ],
  },
};

const post = () => {};

seeFetch.config('promo/ci/order/getList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/event/charitableRecordList ',
    '/promo/ci/order/mock/get_list',
    '/promo/ci/order/mock/get_list',
  ],
  req: [req, req],
  pre: [pre, pre],
  refactor: [refactor, refactor],
  post: [post, post],
});
