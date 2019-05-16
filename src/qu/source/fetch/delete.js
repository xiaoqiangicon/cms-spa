import seeFetch from 'see-fetch';

const pre = params => ({ ...params, status: -1 });

seeFetch.config('qu/source/delete', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/wish/addOrUpdateWishAd',
    '/qu/source/mock/del1',
    '/qu/source/mock/del',
  ],
  pre: [pre, pre],
});
