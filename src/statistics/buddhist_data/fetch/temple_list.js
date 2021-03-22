import seeFetch from 'see-fetch';

seeFetch.config('statistics/buddhist_data/temple_list', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/stat/getTempleNameList/',
    '/src/statistics/buddhist_data/mock/templeList',
  ],
});
