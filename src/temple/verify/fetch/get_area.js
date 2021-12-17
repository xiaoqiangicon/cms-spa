import seeFetch from 'see-fetch';

seeFetch.config('/temple/verify/getArea', {
  method: ['get'],
  url: [
    '/temple/getArea',
    '/temple/verify/mock/area',
    '/temple/verify/mock/area',
  ],
  stringify: [!0],
});
