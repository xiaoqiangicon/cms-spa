/* eslint-disable no-param-reassign, prefer-destructuring, no-nested-ternary */
import seeFetch from 'see-fetch';

seeFetch.config('creator/personnel/list', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/video/list',
    '/creator/personnel/mock/list',
    '/creator/personnel/mock/list',
  ],
});
