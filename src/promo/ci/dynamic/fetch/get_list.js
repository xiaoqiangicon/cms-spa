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
        images: 'img',
        ifPush: 'isPush',
        // hasPush: 'hasPush',
      },
    ],
  },
};

const post = res => {
  res.data.list.forEach(item => {
    /* eslint-disable-next-line no-param-reassign */
    item.images = item.images ? item.images.split(',') : [];
    item.videos = item.video ? item.video.split(',') : [];
  });
};

seeFetch.config('promo/ci/dynamic/getList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/event/charitableScheduleList',
    '/promo/ci/dynamic/mock/get_list',
    '/promo/ci/dynamic/mock/get_list',
  ],
  req: [req, req],
  pre: [pre, pre],
  refactor: [refactor, refactor],
  post: [post, post],
});
