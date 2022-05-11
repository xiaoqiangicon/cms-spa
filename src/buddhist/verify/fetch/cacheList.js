import seeFetch from 'see-fetch';

seeFetch.config('/buddhist/verify/cacheList', {
  method: ['post'],
  url: [
    '/ceremony/list/',
    '/buddhist/verify/mock/cacheList',
    '/buddhist/verify/mock/cacheList',
  ],
  stringify: [!0],
});
