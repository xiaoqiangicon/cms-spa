/* eslint-disable no-param-reassign, prefer-destructuring, no-nested-ternary */
import seeFetch from 'see-fetch';

const req = {
  id: 'pickUpId',
  images: 'pic',
};

seeFetch.config('finance/taking/finish', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/finance/finishPickUp',
    '/finance/taking/mock/finish1',
    '/finance/taking/mock/finish',
  ],
  req: [req, req],
});
