/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

seeFetch.config('statistics/channel/save', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/statistics/getRefundOrderList',
    '/statistics/channel/mock/save',
    '/statistics/channel/mock/save',
  ],
});
