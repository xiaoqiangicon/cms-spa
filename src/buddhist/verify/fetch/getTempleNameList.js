import seeFetch from 'see-fetch';

seeFetch.config('/buddhist/verify/templeNameList', {
  method: ['post'],
  url: [
    '/stat/getTempleNameList/',
    '/buddhist/verify/mock/templeList',
    '/buddhist/verify/mock/templeList',
  ],
  stringify: [!0],
});
