import seeFetch from 'see-fetch';

seeFetch.config('finance/income/getBuddhistList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/ceremony/cacheList/',
    '/finance/income/mock/buddhistList',
    '/finance/income/mock/buddhistList',
  ],
});
