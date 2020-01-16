/* eslint-disable no-param-reassign, prefer-destructuring, no-nested-ternary */
import seeFetch from 'see-fetch';

const refactor = {
  data: [
    {
      name: 'temple_name',
    },
  ],
};

seeFetch.config('finance/pending/temples', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/finance/getTempleIdList',
    '/finance/pending/mock/temples1',
    '/finance/pending/mock/temples',
  ],
  refactor: [refactor, refactor],
});
