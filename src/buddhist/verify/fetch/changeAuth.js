import seeFetch from 'see-fetch';

seeFetch.config('/buddhist/verify/auth', {
  method: ['post'],
  url: [
    '/ceremony/auth/',
    '/buddhist/verify/mock/auth',
    '/buddhist/verify/mock/auth',
  ],
  stringify: [!0],
});
