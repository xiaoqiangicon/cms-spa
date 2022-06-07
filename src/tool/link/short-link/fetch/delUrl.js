/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

seeFetch.config('delUrl', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/event/delUrl',
    '/tool/link/short-link/short-linkdelUrl',
    '/tool/link/short-link/delUrl',
  ],
});
