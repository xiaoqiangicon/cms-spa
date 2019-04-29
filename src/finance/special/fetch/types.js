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

seeFetch.config('finance/special/types', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/finance/getTransactionRecordTypeList',
    '/finance/special/mock/types1',
    '/finance/special/mock/types',
  ],
  refactor: [refactor, refactor],
});
