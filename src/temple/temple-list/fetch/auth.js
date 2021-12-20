import seeFetch from 'see-fetch';

seeFetch.config('/temple/list/auth', {
  method: ['post'],
  url: [
    '/temple/auth',
    '/temple/temple-list/mock/auth',
    '/temple/temple-list/mock/auth',
  ],
  stringify: [!0],
});
