/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

const req = {
  id: 'pickUpId',
  gotReceipt: 'isExpressReceipt',
};

seeFetch.config('finance/pending/updateGotReceipt', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/finance/expressReceipt',
    '/finance/pending/mock/updateGotReceipt1',
    '/finance/pending/mock/updateGotReceipt',
  ],
  req: [req, req],
});
