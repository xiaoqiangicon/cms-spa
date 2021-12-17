import seeFetch from 'see-fetch';

seeFetch.config('/temple/financeVerify/verify', {
  method: ['post'],
  url: [
    '/finance/verifyTempleBank',
    '/temple/temple-list/mock/auth',
    '/temple/temple-list/mock/auth',
  ],
  stringify: [!0],
});
