import seeFetch from 'see-fetch';

seeFetch.config('statistics/promo/list', {
  method: ['post'],
  stringify: [!0],
  url: ['/stat/getAppExtensionStatistics/', '/src/statistics/promo/mock/list'],
});
