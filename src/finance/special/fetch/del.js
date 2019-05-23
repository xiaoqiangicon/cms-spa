/* eslint-disable no-param-reassign, prefer-destructuring, no-nested-ternary */
import seeFetch from 'see-fetch';

const req = {
  id: 'pickUpId',
};

seeFetch.config('finance/special/del', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/finance/repealPickUp/',
    '/finance/special/mock/del1',
    '/finance/special/mock/del',
  ],
  req: [req, req],
});
