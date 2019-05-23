import seeFetch from 'see-fetch';

const preHandle = req => ({ ...req, status: -1 });

seeFetch.config('finance/record/delete', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/manualRecord/update',
    '/finance/record/mock/del1',
    '/finance/record/mock/del',
  ],
  preHandle: [preHandle, preHandle],
});
