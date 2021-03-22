/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';
import { safeFloat } from '../../../../../pro-com/src/utils';

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
        payAmount: 'orderMoney',
        // 零售价
        saleAmount: 'orderMoney',
        // 业务员收入
        businessIncome: 'businessMoney',
        // 销售员收入
        sellerIncome: 'sellerMoney',
      },
    ],
  },
};

const post = res => {
  if (res.data && res.data.list) {
    res.data.list.forEach(item => {
      item.payAmount = safeFloat(item.payAmount || 0) || 0;
      item.saleAmount = safeFloat(item.saleAmount || 0) || 0;
      item.businessIncome = safeFloat(item.businessIncome || 0) || 0;
      item.sellerIncome = safeFloat(item.sellerIncome || 0) || 0;
    });
  }
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
  post: [post, post],
});
