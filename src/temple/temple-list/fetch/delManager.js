import seeFetch from 'see-fetch';

seeFetch.config('/temple/list/delManager', {
  method: ['post'],
  url: [
    '/temple/delManager',
    '/temple/temple-list/mock/auth',
    '/temple/temple-list/mock/auth',
  ],
  stringify: [!0],
});
