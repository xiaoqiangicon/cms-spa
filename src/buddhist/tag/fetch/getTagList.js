/* eslint-disable no-param-reassign, prefer-destructuring, no-nested-ternary */
import seeFetch from 'see-fetch';

seeFetch.config('buddhist/tag/getTagList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/tag/list/',
    '/buddhist/classify/mock/getTagList',
    '/buddhist/classify/mock/getTagList',
  ],
});
