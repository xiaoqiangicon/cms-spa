/* eslint-disable no-param-reassign, prefer-destructuring, no-nested-ternary */
import seeFetch from 'see-fetch';

seeFetch.config('buddhist/classify/list', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/ceremony/list/',
    '/buddhist/classify/mock/list',
    '/buddhist/classify/mock/list',
  ],
});
