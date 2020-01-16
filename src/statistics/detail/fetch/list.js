/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

seeFetch.config('statistics/detail/list', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/stat/getChannelRecordList',
    '/statistics/detail/mock/list',
    '/statistics/detail/mock/list',
  ],
});
