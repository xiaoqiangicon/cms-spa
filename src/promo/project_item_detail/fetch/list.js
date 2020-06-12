import seeFetch from 'see-fetch';

seeFetch.config('promo/projectDetail/list', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/stat/getCommodityStatisticsList',
    '/promo/project_item_detail/mock/list',
    '/promo/project_item_detail/mock/list',
  ],
});
