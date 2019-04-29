/* eslint-disable no-param-reassign, prefer-destructuring, no-nested-ternary */
import seeFetch from 'see-fetch';

const req = {
  subId: 'commodityId',
};

seeFetch.config('finance/special/add', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/finance/specialPickUp',
    '/finance/special/mock/add1',
    '/finance/special/mock/add',
  ],
  req: [req, req],
});
