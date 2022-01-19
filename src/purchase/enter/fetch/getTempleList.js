import seeFetch from 'see-fetch';

seeFetch.config('purchase/enter/getTempleList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/finance/getTempleIdList',
    '/purchase/enter/mock/templeList',
    '/purchase/enter/mock/templeList',
  ],
});
