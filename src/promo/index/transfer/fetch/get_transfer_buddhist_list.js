import seeFetch from 'see-fetch';

const req = {
  page: 'pageNumber',
  // pageSize: 'pageSize',
};

const pre = params => ({
  ...params,
  pageNumber: params.pageNumber - 1,
});

const refactor = {
  total: 'count',
  data: [
    {
      buddhistId: 'id',
      buddhistName: 'name',
      // templeList: 'templeList',
      // orderNum: 'orderNum', // 未转单数
      // conversionOrderNum: 'conversionOrderNum', // 已转单数
      // conversionOrderPrice: 'conversionOrderPrice', // 已转金额
      // profitConversionOrderPrice: 'profitConversionOrderPrice', // 盈收金额
      promotionPercent: 'promotionPercentage', // 推广百分比
      // time: 'time', // 添加时间
      // isEnd: 'isEnd', // 是否结束
      isShareFuBi: 'isShareBlessCoin', // 是否分享福币
      subList: 'subdivide', // 选择项列表
      _subList: [
        {
          // id: 'id',
          // name: 'name',
          shareFuBiPercent: 'shareBlessCoinPercentage',
        },
      ],
    },
  ],
};

const post = () => {};

seeFetch.config('promo/index/transfer/getTransferBuddhistList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/conversionOrder/conversionOrderCommodityGetList',
    '/promo/index/transfer/mock/get_transfer_buddhist_list',
    '/promo/index/transfer/mock/get_transfer_buddhist_list',
  ],
  req: [req, req],
  pre: [pre, pre],
  refactor: [refactor, refactor],
  post: [post, post],
});
