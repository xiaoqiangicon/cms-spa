import seeFetch from 'see-fetch';

const preHandle = req => ({ ...req, status: -1 });

seeFetch.config('finance/remark/delete', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/cashMemo/updateStatus',
    '/finance/remark/mock/del1',
    '/finance/remark/mock/del',
  ],
  preHandle: [preHandle, preHandle],
});
