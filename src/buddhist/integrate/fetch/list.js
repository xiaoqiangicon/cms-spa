/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

const post = res => {};

seeFetch.config('buddhist/integrate/list', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/blessCoin/missionList',
    '/buddhist/integrate/mock/list',
    '/buddhist/integrate/mock/list',
  ],
  post: [post],
});
