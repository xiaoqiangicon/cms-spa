import seeFetch from 'see-fetch';

seeFetch.config('/buddhist/verify/opruleList', {
  method: ['post'],
  url: [
    '/oprule/list/',
    '/buddhist/verify/mock/opruleList',
    '/buddhist/verify/mock/opruleList',
  ],
  stringify: [!0],
});
