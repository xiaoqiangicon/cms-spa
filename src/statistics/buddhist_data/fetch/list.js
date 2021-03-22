import seeFetch from 'see-fetch';

seeFetch.config('statistics/buddhist_data/list', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/stat/getCommodityStatisticsSumList/',
    '/src/statistics/temple_data/mock/list',
  ],
});
