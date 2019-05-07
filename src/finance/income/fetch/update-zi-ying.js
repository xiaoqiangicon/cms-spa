import seeFetch from 'see-fetch';

const requestKeys = {
  foShiId: 'commodityId',
  corporationProfitRate: 'percentage',
};

seeFetch.config('finance/income/updateZiYing', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/earningsStatistics/addAndUpdateZizaihomeCommodity',
    '/finance/income/mock/updateZiYing1',
    '/finance/income/mock/updateZiYing',
  ],
  requestKeys: [requestKeys, requestKeys],
});
