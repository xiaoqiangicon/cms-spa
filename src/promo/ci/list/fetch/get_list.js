import seeFetch from 'see-fetch';

const req = {
  page: 'pageNum',
  // pageSize: 'pageSize',
};

const refactor = {
  data: {
    total: 'count',
    list: [
      {
        title: 'title',
        subtitle: 'littleTitle',
        images: 'feedbackImg',
        remark: 'feedbackContent',
        productNum: 'feedbackProduce',
        userInfo: [
          {
            // userId,
            nickname: 'nickName',
            tel: 'phone',
          },
        ],
      },
    ],
  },
};

const post = res => {
  res.data.list.forEach(item => {
    /* eslint-disable-next-line no-param-reassign */
    item.images = item.images.split(',');
  });
};

seeFetch.config('promo/ci/list/getList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/event/charitableOrderList',
    '/promo/ci/list/mock/get_list',
    '/promo/ci/list/mock/get_list',
  ],
  req: [req, req],
  refactor: [refactor, refactor],
  post: [post, post],
});
