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
  pageNumber: params.pageNumber - 1,
});

const refactor = {
  total: 'count',
  data: [
    {
      buddhistName: 'name', // 佛事名称
      subName: 'subdivideName', // 选择项名称
      subId: 'subdivideId', // 选择项id
      // buyNum: 'buyNum', // 数量
      isAuto: 'isAutoConversion', // 自动/手动 转单
      // price: 'price', // 转单价格
      // orderId: 'orderId', // 订单号
      orderNum: 'orderNo', // 外部订单号
      wxId: 'wxTransactionId', // 支付流水号
      orderList: 'conversionOrder',
      ps: 'posiscript',
      _ps: [
        {
          feedBackImg: 'pic_url',
          ps: 'posiscript',
          subId: 'subdirideId',
          subName: 'subdirideName',
        },
      ],
      _orderList: [
        {
          addTime: 'addTime', // 转单时间
          transferPrice: 'conversionOrderPrice', // 转单价格
          isFinish: 'isFinish', // 已被处理
          templeName: 'templeName', // 所属寺院
          feedBackImg: 'disposePicUrl', // 反馈图片
          ps: 'posiscript',
        },
      ],
    },
  ],
};

const post = () => {};

seeFetch.config('promo/index/transfer/getTransferOrderList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/conversionOrder/getConversionOrderList',
    '/promo/index/transfer/mock/get_transfer_order_list',
    '/promo/index/transfer/mock/get_transfer_order_list',
  ],
  req: [req, req],
  pre: [pre, pre],
  refactor: [refactor, refactor],
  post: [post, post],
});
