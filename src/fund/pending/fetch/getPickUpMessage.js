/* eslint-disable no-param-reassign, prefer-destructuring, no-nested-ternary */
import seeFetch from 'see-fetch';

seeFetch.config('fund/pending/getPickUpMessage', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/video/getPickUpMessage',
    '/fund/pending/mock/getPickUpMessage',
    '/fund/pending/mock/getPickUpMessage',
  ],
});
