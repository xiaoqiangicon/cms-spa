import seeFetch from 'see-fetch';

const pre = params => ({ ...params, status: -1 });

seeFetch.config('ling/index/delete', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/wish/addOrUpdateWishGift',
    '/ling/index/mock/del1',
    '/ling/index/mock/del',
  ],
  pre: [pre, pre],
});
