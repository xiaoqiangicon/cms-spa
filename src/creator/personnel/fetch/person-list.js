/* eslint-disable no-param-reassign, prefer-destructuring, no-nested-ternary */
import seeFetch from 'see-fetch';

seeFetch.config('creator/personnel/personList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/video/listSimple',
    '/creator/personnel/mock/personList',
    '/creator/personnel/mock/personList',
  ],
});
