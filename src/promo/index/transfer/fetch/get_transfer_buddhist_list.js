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
  total: 'count',
  data: [
    {
      id: 'id',
      name: 'name',
      templeList: 'templeList',
      orderNum: 'orderNum', // 未转单数
      conversionOrderNum: 'conversionOrderNum', // 已转单数
      conversionOrderPrice: 'conversionOrderPrice', // 已转金额
      profitConversionOrderPrice: 'profitConversionOrderPrice', // 盈收金额
      time: 'time', // 添加时间
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
