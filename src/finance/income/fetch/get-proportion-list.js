import seeFetch from 'see-fetch';

seeFetch.config('finance/income/getProportionList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/earningsStatistics/getProjectStatisticsProportionList',
    '/finance/income/mock/getProportionList',
    '/finance/income/mock/getProportionList',
  ],
});
