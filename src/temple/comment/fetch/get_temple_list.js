import seeFetch from 'see-fetch';

seeFetch.config('temple/comment/getTempleList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/conversionOrder/getTempleList',
    '/src/temple/comment/mock/get_temple_list',
    '/src/temple/comment/mock/get_temple_list',
  ],
});
