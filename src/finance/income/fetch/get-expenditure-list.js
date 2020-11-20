import seeFetch from 'see-fetch';

seeFetch.config('finance/income/getExpenditureList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/earningsStatistics/getProjectStatisticsExpenditureList',
    '/finance/income/mock/getExpenditureList',
    '/finance/income/mock/getExpenditureList',
  ],
});
