/* eslint-disable no-param-reassign, prefer-destructuring, no-nested-ternary */
import seeFetch from 'see-fetch';

const refactor = {
  data: [
    {
      name: 'temple_name',
    },
  ],
};

seeFetch.config('finance/special/temples', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/finance/getTempleIdList',
    '/finance/special/mock/temples1',
    '/finance/special/mock/temples',
  ],
  refactor: [refactor, refactor],
});
