import seeFetch from 'see-fetch';

seeFetch.config('finance/income/getProjectList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/earningsStatistics/getProjectStatistics',
    '/finance/income/mock/getProjectList',
    '/finance/income/mock/getProjectList',
  ],
});
