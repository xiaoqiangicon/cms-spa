import seeFetch from 'see-fetch';

seeFetch.config('/temple/list/unlock', {
  method: ['post'],
  url: [
    '/temple/unlockTempleUser',
    '/temple/temple-list/mock/auth',
    '/temple/temple-list/mock/auth',
  ],
  stringify: [!0],
});
