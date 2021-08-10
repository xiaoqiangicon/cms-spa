import seeFetch from 'see-fetch';

const requestKeys = {
  id: 'expenditureId',
};

seeFetch.config('finance/income/delZiYingUse', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/earningsStatistics/delExpenditure',
    '/finance/income/mock/delZiYingUse1',
    '/finance/income/mock/delZiYingUse',
  ],
  requestKeys: [requestKeys, requestKeys],
});
