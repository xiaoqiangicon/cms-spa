/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

const req = {
  id: 'pickUpId',
};

seeFetch.config('finance/pending/makeDone', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/finance/finishPickUp',
    '/finance/pending/mock/makeDone1',
    '/finance/pending/mock/makeDone',
  ],
  req: [req, req],
});
