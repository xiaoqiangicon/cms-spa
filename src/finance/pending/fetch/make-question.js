/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

const req = {
  id: 'pickUpId',
  reason: 'question',
};

seeFetch.config('finance/pending/makeQuestion', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/finance/receiptQuestion',
    '/finance/pending/mock/makeQuestion1',
    '/finance/pending/mock/makeQuestion',
  ],
  req: [req, req],
});
