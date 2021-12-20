import seeFetch from 'see-fetch';

seeFetch.config('/temple/list/allowOp', {
  method: ['post'],
  url: [
    '/temple/allowOP',
    '/temple/temple-list/mock/auth',
    '/temple/temple-list/mock/auth',
  ],
  stringify: [!0],
});
