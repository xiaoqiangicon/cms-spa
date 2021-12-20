import seeFetch from 'see-fetch';

seeFetch.config('/temple/list/userPwSave', {
  method: ['post'],
  url: [
    '/temple/userPwSave',
    '/temple/temple-list/mock/auth',
    '/temple/temple-list/mock/auth',
  ],
  stringify: [!0],
});
