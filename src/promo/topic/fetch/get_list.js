import seeFetch from 'see-fetch';

const req = {
  page: 'pageNo',
  // pageSize: 'pageSize',
};

const pre = params => ({
  ...params,
  pageNum: params.pageNum - 1,
});

const refactor = {
  // total: 'total',
  data: 'data.list',
  _data: [
    {
      id: 'id',
      title: 'title',
      addTime: 'addTime',
      link: 'url',
      introduce: 'introduce',
      cover: 'coverPic',
      isShowWish: 'isShowWish|bool',
      status: 'status',
    },
  ],
};

const post = res => {
  res.data.forEach(item => {
    /* eslint-disable no-param-reassign */
    item.cover = item.cover.split(',');
  });
};

seeFetch.config('promo/topic/getList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/topic/editComponent',
    '/promo/topic/mock/get_list',
    '/promo/topic/mock/get_list',
  ],
  req: [req, req],
  pre: [pre, pre],
  post: [post, post],
  refactor: [refactor, refactor],
});
