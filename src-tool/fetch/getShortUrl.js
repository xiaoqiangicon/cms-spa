/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

seeFetch.config('getShortUrl', {
  method: ['post'],
  stringify: [!0],
  url: ['/event/getShortUrl', '/src-tool/getShortUrl', '/src-tool/getShortUrl'],
});
