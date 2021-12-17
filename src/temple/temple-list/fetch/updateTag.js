import seeFetch from 'see-fetch';

seeFetch.config('/temple/list/update', {
  method: ['post'],
  url: [
    '/temple/update',
    '/temple/temple-list/mock/update',
    '/temple/temple-list/mock/update',
  ],
  stringify: [!0],
});
