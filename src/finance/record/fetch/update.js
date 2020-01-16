import seeFetch from 'see-fetch';

const requestKeys = {
  name: 'title',
  itemId: 'type',
  income: 'money',
  incomeTime: 'getDate',
};

seeFetch.config('finance/record/update', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/manualRecord/add',
    '/finance/record/mock/update1',
    '/finance/record/mock/update',
  ],
  requestKeys: [requestKeys, requestKeys],
});
