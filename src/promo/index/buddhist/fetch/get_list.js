import seeFetch from 'see-fetch';

const req = {
  buddhistId: 'commodityId',
  // templeId: 'templeId',
  page: 'pageNumber',
  // pageSize: 'pageSize',
};

// const pre = params => ({
//   ...params,
//   pageNumber: params.pageNumber - 1,
// });

const refactor = {
  data: {
    total: 'count',
    list: [
      {
        buddhistId: 'commodityId',
        buddhistName: 'commodityName',
        // isEnd: 'isEnd',
        // isFinish: 'isFinish',
        // templeId: 'templeId',
        // templeName: 'templeName',
        // rate: 'rate',
        // startTime: 'startTime',
        // updateTime: 'updateTime',
        // isPromotion: 'isPromotion',
        updateUser: 'managerName',
        promotionPercent: 'promotionPercentage', // 推广百分比
        subList: 'subdivideList',
        _subList: [
          {
            // id: 'id',
            shareFuBiPercent: 'shareBlessCoinPercentage',
          },
        ],
        isShareFuBi: 'isShareBlessCoin', // 是否设置分享福币
      },
    ],
  },
};

const post = () => {};

seeFetch.config('promo/index/buddhist/getList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/rate/getCommodityList',
    '/promo/index/buddhist/mock/get_list',
    '/promo/index/buddhist/mock/get_list',
  ],
  req: [req, req],
  // pre: [pre, pre],
  refactor: [refactor, refactor],
  post: [post, post],
});
