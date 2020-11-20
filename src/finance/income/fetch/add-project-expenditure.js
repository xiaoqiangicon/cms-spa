import seeFetch from 'see-fetch';

seeFetch.config('finance/income/addProjectExpenditure', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/earningsStatistics/addProjectStatisticsExpenditure',
    '/finance/income/mock/addProjectExpenditure',
    '/finance/income/mock/addProjectExpenditure',
  ],
});
