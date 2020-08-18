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
    },
  ],
};

seeFetch.config('sl-promo/project-detail/selections', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/cooperation/getCooperationSubdivide',
    '/sl-promo/project-detail/mock/selectionsS',
    '/sl-promo/project-detail/mock/selections',
  ],
  refactor: [refactor, refactor],
});
