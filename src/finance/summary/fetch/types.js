/* eslint-disable no-param-reassign, prefer-destructuring, no-nested-ternary */
import seeFetch from 'see-fetch';

const refactor = {
  data: [
    {
      id: 'type',
      children: 'subList',
    },
  ],
};

seeFetch.config('finance/summary/types', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/finance/getTransactionRecordTypeList',
    '/finance/summary/mock/types1',
    '/finance/summary/mock/types',
  ],
  refactor: [refactor, refactor],
});
