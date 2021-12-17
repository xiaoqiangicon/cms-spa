import seeFetch from 'see-fetch';

seeFetch.config('/temple/verify/saveRights', {
  method: ['post'],
  url: [
    '/application/auth',
    '/temple/temple-list/mock/auth',
    '/temple/temple-list/mock/auth',
  ],
  stringify: [!0],
});
