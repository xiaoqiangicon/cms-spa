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

const post = res => {
  res.data.list.forEach(item => {
    /* eslint-disable-next-line no-param-reassign */
    item.images = item.images.split(',');
  });
};

seeFetch.config('promo/ci/dynamic/getList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '//',
    '/promo/ci/dynamic/mock/get_list',
    '/promo/ci/dynamic/mock/get_list',
  ],
  req: [req, req],
  refactor: [refactor, refactor],
  post: [post, post],
});
