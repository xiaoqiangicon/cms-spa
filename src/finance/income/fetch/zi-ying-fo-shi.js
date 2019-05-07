import seeFetch from 'see-fetch';

seeFetch.config('finance/income/ziYingFoShi', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/earningsStatistics/getCommodityList',
    '/finance/income/mock/ziYingFoShi1',
    '/finance/income/mock/ziYingFoShi',
  ],
});
