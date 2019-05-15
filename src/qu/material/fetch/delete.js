import seeFetch from 'see-fetch';

const pre = params => ({ ...params, status: -1 });

seeFetch.config('qu/material/delete', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/wish/addOrUpdateWishAd',
    '/qu/material/mock/del1',
    '/qu/material/mock/del',
  ],
  pre: [pre, pre],
});
