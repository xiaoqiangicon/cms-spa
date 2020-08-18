/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

seeFetch.config('sl-promo/project-detail/online', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/cooperation/updateCommodityStatus',
    '/sl-promo/project-detail/mock/onlineS',
    '/sl-promo/project-detail/mock/online',
  ],
});
