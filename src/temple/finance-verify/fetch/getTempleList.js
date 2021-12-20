import seeFetch from 'see-fetch';

seeFetch.config('/temple/financeVerify/getTempleList', {
  method: ['post'],
  url: [
    '/finance/getTempleIdList',
    '/src/temple/finance-verify/mock/getTempleList',
    '/src/temple/finance-verify/mock/getTempleList',
  ],
  stringify: [!0],
});
