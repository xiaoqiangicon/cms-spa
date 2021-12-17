import seeFetch from 'see-fetch';

seeFetch.config('/temple/list/managerList', {
  method: ['post'],
  url: [
    '/temple/managerList',
    '/temple/temple-list/mock/managerList',
    '/temple/temple-list/mock/managerList',
  ],
  stringify: [!0],
});
