import seeFetch from 'see-fetch';

const requestKeys = {
  checked: 'status',
};

seeFetch.config('finance/remark/switch', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/cashMemo/updateStatus',
    '/finance/remark/mock/switch1',
    '/finance/remark/mock/switch0',
  ],
  requestKeys: [requestKeys, requestKeys],
});
