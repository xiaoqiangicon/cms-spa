/* eslint-disable no-param-reassign, prefer-destructuring, no-nested-ternary */
import seeFetch from 'see-fetch';

const refactor = {
  data: [
    {
      name: 'temple_name',
    },
  ],
};

seeFetch.config('finance/summary/temples', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/finance/getTempleIdList',
    '/finance/summary/mock/temples1',
    '/finance/summary/mock/temples',
  ],
  refactor: [refactor, refactor],
});
