/* eslint-disable no-param-reassign, prefer-destructuring, no-nested-ternary */
import seeFetch from 'see-fetch';

const refactor = {
  data: [
    {
      name: 'temple_name',
    },
  ],
};

seeFetch.config('finance/stat/temples', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/finance/getTempleIdList',
    '/finance/stat/mock/temples1',
    '/finance/stat/mock/temples',
  ],
  refactor: [refactor, refactor],
});
