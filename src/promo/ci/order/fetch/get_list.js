import seeFetch from 'see-fetch';

const req = {
  page: 'pageNumber',
  // pageSize: 'pageSize',
};

const refactor = {
  data: {
    total: 'count',
    list: [{}],
  },
};

const post = () => {};

seeFetch.config('promo/ci/order/getList', {
  method: ['post'],
  stringify: [!0],
  url: ['//', '/promo/ci/order/mock/get_list', '/promo/ci/order/mock/get_list'],
  req: [req, req],
  refactor: [refactor, refactor],
  post: [post, post],
});
