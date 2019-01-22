import seeFetch from 'see-fetch';

seeFetch.config('ling/index/status', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/wish/addOrUpdateWishGift',
    '/ling/index/mock/status1',
    '/ling/index/mock/status',
  ],
});
