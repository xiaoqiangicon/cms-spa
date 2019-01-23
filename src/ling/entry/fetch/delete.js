import seeFetch from 'see-fetch';

const pre = params => ({ ...params, status: -1 });

seeFetch.config('ling/entry/delete', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/wish/addOrUpdateWishType',
    '/ling/entry/mock/del1',
    '/ling/entry/mock/del',
  ],
  pre: [pre, pre],
});
