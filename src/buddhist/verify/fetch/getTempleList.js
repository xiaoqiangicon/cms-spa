import seeFetch from 'see-fetch';

seeFetch.config('/buddhist/verify/templeList', {
  method: ['post'],
  url: [
    '/temple/list/',
    '/buddhist/verify/mock/templeList',
    '/buddhist/verify/mock/templeList',
  ],
  stringify: [!0],
});
