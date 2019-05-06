import seeFetch from 'see-fetch';

const requestKeys = {
  content: 'title',
};

seeFetch.config('finance/remark/update', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/cashMemo/add',
    '/finance/remark/mock/update1',
    '/finance/remark/mock/update',
  ],
  requestKeys: [requestKeys, requestKeys],
});
