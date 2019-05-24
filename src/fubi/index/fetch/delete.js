/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

const req = {
  id: 'commodityId',
};

seeFetch.config('fubi/index/delete', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/blessCoinShop/delBlessCoinCommodity',
    '/fubi/index/mock/success',
    '/fubi/index/mock/success',
  ],
  req: [req, req],
});
