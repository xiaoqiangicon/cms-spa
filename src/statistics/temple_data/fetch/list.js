import seeFetch from 'see-fetch';

seeFetch.config('statistics/temple_data/list', {
  method: ['post'],
  stringify: [!0],
  url: ['/stat/templeList/', '/src/statistics/temple_data/mock/list'],
});
