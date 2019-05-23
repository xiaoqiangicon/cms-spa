/* eslint-disable no-param-reassign, prefer-destructuring, no-nested-ternary */
import seeFetch from 'see-fetch';

const refactor = {
  toHandleCount: 'pick_up_sum',
  toReplyCount: 'question_sum',
};

seeFetch.config('finance/pending/stat', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/finance/getPickUpNum',
    '/finance/pending/mock/stat1',
    '/finance/pending/mock/stat',
  ],
  refactor: [refactor, refactor],
});
