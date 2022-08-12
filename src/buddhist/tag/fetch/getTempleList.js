/* eslint-disable no-param-reassign, prefer-destructuring, no-nested-ternary */
import seeFetch from 'see-fetch';

seeFetch.config('buddhist/classify/getTempleList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/temple/list/',
    '/buddhist/classify/mock/getTempleList',
    '/buddhist/classify/mock/getTempleList',
  ],
});
