/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

const refactor = {
  data: [{}],
};

const post = res => {};

seeFetch.config('statistics/channel/list', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/statistics/getRefundOrderList',
    '/statistics/channel/mock/list',
    '/statistics/channel/mock/list',
  ],
  refactor: [refactor],
  post: [post],
});
