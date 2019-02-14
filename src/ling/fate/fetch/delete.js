import seeFetch from 'see-fetch';

const pre = params => ({ ...params, status: -1 });

seeFetch.config('ling/fate/delete', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/wish/addOrUpdateWishAd',
    '/ling/fate/mock/del1',
    '/ling/fate/mock/del',
  ],
  pre: [pre, pre],
});
