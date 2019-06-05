/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

const req = {
  // type: 'type', // 0 全部 1 转单佛事 2 推广佛事
  // isEnd: 'isEnd', // 0 未结束 1 结束
  page: 'pageNum',
  // pageSize: 'pageSize',
};

const pre = params => ({
  ...params,
  pageNum: params.pageNum - 1,
});

const refactor = {
  data: {
    // total: 'total',
    list: [
      {
        buddhistId: 'id', // 佛事 id
        buddhistName: 'name', // 佛事名
        sort: 'blessCoinSort',
        // templeName: 'templeName',
        // type: 'type', 1 转单佛事 2 推广佛事
        orderNum: 'conversionOrderNum', // 订单数
        sharePay: 'shareBlessCoinPay', // 分享支付
        fuBiMoney: 'shareBlessCoin', // 产生福币

        // 跳转 转单设置 需要的字段
        subList: 'subdivide',
        _subList: [
          {
            // id: 'id',
            // name: 'name',
            shareFuBiPercent: 'shareBlessCoinPercentage',
          },
        ],
        // isEnd: 'isEnd',
        promotionPercent: 'promotionPercentage',

        // 跳转 转单佛事设置 需要的字段
        isPromotion: 'isPromotion',
        rate: 'rate',
        startTime: 'startTime',
      },
    ],
  },
};

seeFetch.config('promo/index/fu/get_list', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/blessCoinShop/getBlessCoinShareList',
    '/promo/index/fu/mock/get_list',
    '/promo/index/fu/mock/get_list',
  ],
  req: [req, req],
  pre: [pre, pre],
  refactor: [refactor, refactor],
});
