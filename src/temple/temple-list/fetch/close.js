import seeFetch from 'see-fetch';

seeFetch.config('/temple/list/close', {
  method: ['post'],
  url: [
    '/temple/close',
    '/temple/temple-list/mock/auth',
    '/temple/temple-list/mock/auth',
  ],
  stringify: [!0],
});
