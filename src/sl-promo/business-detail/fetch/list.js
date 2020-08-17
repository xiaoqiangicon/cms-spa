/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

const req = {
  status: 'type',
};

const refactor = {
  data: {
    list: [
      {
        // 订单号码
        orderNum: 'orderNo',
        // 支付金额
        payAmount: 'contentOrderMoney',
        // 零售价
        saleAmount: 'contentOrderMoney',
        // 业务员收入
        businessIncome: 'businessMoney',
        // 销售员收入
        sellerIncome: 'sellerMoney',
      },
    ],
  },
};

seeFetch.config('sl-promo/business-detail/list', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/cooperation/getCooperationSellOrder',
    '/sl-promo/business-detail/mock/listS',
    '/sl-promo/business-detail/mock/list',
  ],
  req: [req, req],
  refactor: [refactor, refactor],
});
