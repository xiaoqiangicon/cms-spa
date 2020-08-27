/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

const req = {
  keyword: 'content',
};

const refactor = {
  data: {
    list: [
      {
        id: 'commodityId',
        // 状态（-1：未开始，0：进行中，1：已结束）
        status: 'isEnd',
        // 支付金额
        payAmount: 'payMoney',
        // 业务员分成金额
        businessProfit: 'businessMoney',
        // 销售员分成金额
        sellerProfit: 'sellerMoney',
        // 成本金额
        costAmount: 'originalMoney',
        // 总订单数
        totalOrders: 'orderNum',
      },
    ],
  },
};

seeFetch.config('sl-business-promo/project/list', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/cooperation/getCommodityList',
    '/sl-business-promo/project/mock/listS',
    '/sl-business-promo/project/mock/list',
  ],
  req: [req, req],
  refactor: [refactor, refactor],
});