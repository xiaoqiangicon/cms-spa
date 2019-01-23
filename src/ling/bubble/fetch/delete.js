import seeFetch from 'see-fetch';

const pre = params => ({ ...params, status: -1 });

seeFetch.config('ling/bubble/delete', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/wish/addOrUpdateWishAd',
    '/ling/bubble/mock/del1',
    '/ling/bubble/mock/del',
  ],
  pre: [pre, pre],
});
