/* eslint-disable no-param-reassign, prefer-destructuring, no-nested-ternary */
import seeFetch from 'see-fetch';

seeFetch.config('fund/pending/personList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/video/listSimple',
    '/fund/pending/mock/personList',
    '/fund/pending/mock/personList',
  ],
});
