import seeFetch from 'see-fetch';

const requestKeys = {
  name: 'title',
  itemId: 'type',
  income: 'money',
  incomeTime: 'getDate',
};

seeFetch.config('finance/taking/add', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/manualRecord/add',
    '/finance/record/mock/add1',
    '/finance/record/mock/add',
  ],
  requestKeys: [requestKeys, requestKeys],
});
