/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

const refactor = {
  data: [
    {
      // 封面
      cover: 'pic',
      // 成本价
      costPrice: 'price',
      // 胜乐供给业务员的价格
      channelPrice: 'companyMoney',
      // 面对用户的销售价
      salePrice: 'retailMoney',
      // 销售员提成
      sellerProfit: 'sellMoney',
    },
  ],
};

seeFetch.config('sl-business-promo/project-detail/selections', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/cooperation/getCooperationSubdivide',
    '/sl-business-promo/project-detail/mock/selectionsS',
    '/sl-business-promo/project-detail/mock/selections',
  ],
  refactor: [refactor, refactor],
});
