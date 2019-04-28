/* eslint-disable no-param-reassign, prefer-destructuring, no-nested-ternary */
import seeFetch from 'see-fetch';

const req = {
  id: 'pickUpId',
};

seeFetch.config('finance/taking/confirm', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/finance/completePickUp',
    '/finance/taking/mock/confirm1',
    '/finance/taking/mock/confirm',
  ],
  req: [req, req],
});
