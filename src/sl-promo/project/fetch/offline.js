/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

seeFetch.config('sl-promo/project/offline', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/cooperation/updateCommodityStatus',
    '/sl-promo/project/mock/offlineS',
    '/sl-promo/project/mock/offline',
  ],
});
