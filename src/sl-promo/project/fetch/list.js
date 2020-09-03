/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';
import { safeFloat } from '../../../../../pro-com/src/utils';

const req = {
  keyword: 'content',
};

const refactor = {
  data: {
    list: [
      {
        id: 'commodityId',
        // 下架状态
        offline: 'status',
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

const post = res => {
  if (res.data && res.data.list) {
    res.data.list.forEach(item => {
      item.payAmount = safeFloat(item.payAmount || 0) || 0;
      item.businessProfit = safeFloat(item.businessProfit || 0) || 0;
      item.sellerProfit = safeFloat(item.sellerProfit || 0) || 0;
      item.costAmount = safeFloat(item.costAmount || 0) || 0;

      // 销售分成金额
      item.promoProfit =
        safeFloat(item.businessProfit + item.sellerProfit) || 0;
      // 胜乐收入金额
      item.slProfit =
        safeFloat(item.payAmount - item.promoProfit - item.costAmount) || 0;
    });
  }
};

seeFetch.config('sl-promo/project/list', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/cooperation/getCommodityList',
    '/sl-promo/project/mock/listS',
    '/sl-promo/project/mock/list',
  ],
  req: [req, req],
  refactor: [refactor, refactor],
  post: [post, post, post],
});
