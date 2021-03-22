/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';
import { safeFloat } from '../../../../../pro-com/src/utils';

const req = {
  status: 'type',
  keyword: 'content',
};

const refactor = {
  data: {
    list: [
      {
        // 订单号码
        orderNum: 'orderNo',
        // 支付金额
        payAmount: 'orderMoney',
        // 业务员收入
        businessIncome: 'businessMoney',
        // 销售员收入
        sellerIncome: 'sellerMoney',
        // 供应价
        originalPrice: 'contentOrderMoney',
      },
    ],
  },
};

const post = res => {
  if (res.data && res.data.list) {
    res.data.list.forEach(item => {
      item.payAmount = safeFloat(item.payAmount || 0) || 0;
      item.originalPrice = safeFloat(item.originalPrice || 0) || 0;
      item.businessIncome = safeFloat(item.businessIncome || 0) || 0;
      item.sellerIncome = safeFloat(item.sellerIncome || 0) || 0;

      item.channelPrice =
        safeFloat(
          (item.payAmount || 0) -
            (item.businessIncome || 0) -
            (item.sellerIncome || 0)
        ) || 0;
    });
  }
};

seeFetch.config('sl-promo/project-detail/saleList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/cooperation/getCooperationSellOrder',
    '/sl-promo/project-detail/mock/saleListS',
    '/sl-promo/project-detail/mock/saleList',
  ],
  req: [req, req],
  refactor: [refactor, refactor],
  post: [post, post],
});
