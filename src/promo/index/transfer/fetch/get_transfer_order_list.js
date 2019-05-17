import seeFetch from 'see-fetch';

const req = {
  // type: 'type', // 1 未转单 2 已转单
  buddhistId: 'commodityId',
  subId: 'subdivideId', // 选择项id 0 全部
  tel: 'phone',
  page: 'pageNumber',
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
      name: 'name', // 佛事名称
      subdivideName: 'subdivideName', // 选择项名称
      buyNum: 'buyNum', // 数量
      isAutoConversion: 'isAutoConversion', // 自动/手动 转单
      price: 'price', // 转单价格
      conversionOrder: [
        {
          addTime: 'addTime', // 转单时间
          conversionOrderPrice: 'conversionOrderPrice',
          isFinish: 'isFinish', //
          templeName: 'templeName', // 所属寺院
        },
      ],
    },
  ],
};

const post = () => { };

seeFetch.config('promo/index/transfer/getTransferOrderList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/conversionOrder/conversionOrderCommodityGetList',
    '/promo/index/transfer/mock/get_transfer_order_list',
    '/promo/index/transfer/mock/get_transfer_order_list',
  ],
  req: [req, req],
  pre: [pre, pre],
  refactor: [refactor, refactor],
  post: [post, post],
});
