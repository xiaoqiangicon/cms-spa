import seeFetch from 'see-fetch';

seeFetch.config('/buddhist/verify/updateHandlingFee', {
  method: ['post'],
  url: [
    '/ceremony/updateHandlingFee/',
    '/buddhist/verify/mock/auth',
    '/buddhist/verify/mock/auth',
  ],
  stringify: [!0],
});
