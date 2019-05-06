import seeFetch from 'see-fetch';

const requestKeys = {
  content: 'title',
};

seeFetch.config('finance/remark/add', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/cashMemo/add',
    '/finance/remark/mock/add1',
    '/finance/remark/mock/add',
  ],
  requestKeys: [requestKeys, requestKeys],
});
