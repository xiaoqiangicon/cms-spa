import seeFetch from 'see-fetch';

seeFetch.config('/temple/list/templeUpdate', {
  method: ['post'],
  url: [
    '/temple/update',
    '/temple/temple-list/mock/auth',
    '/temple/temple-list/mock/auth',
  ],
  stringify: [!0],
});
