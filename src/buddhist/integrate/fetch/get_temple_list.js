import seeFetch from 'see-fetch';

seeFetch.config('buddhist/integrate/getTempleList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/temple/list',
    '/buddhist/integrate/mock/templeList',
    '/buddhist/integrate/mock/templeList',
  ],
});
