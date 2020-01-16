import seeFetch from 'see-fetch';

const requestKeys = {
  foShiId: 'commodityId',
  amount: 'expenditure',
  desc: 'content',
};

seeFetch.config('finance/income/addZiYingUse', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/earningsStatistics/addExpenditure',
    '/finance/income/mock/addZiYingUse1',
    '/finance/income/mock/addZiYingUse',
  ],
  requestKeys: [requestKeys, requestKeys],
});
