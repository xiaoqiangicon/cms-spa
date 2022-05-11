import seeFetch from 'see-fetch';

seeFetch.config('/buddhist/verify/setIsPrivate', {
  method: ['post'],
  url: [
    '/ceremony/setIsPrivate/',
    '/buddhist/verify/mock/auth',
    '/buddhist/verify/mock/auth',
  ],
  stringify: [!0],
});
