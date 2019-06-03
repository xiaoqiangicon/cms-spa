/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

const req = {
  buddhistId: 'commodityId',
  // typeId: 'typeId',
  // sort: 'sort',
};


seeFetch.config('fubi/index/update', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/blessCoinShop/addAndUpdateCommodity2Shop',
    '/fubi/index/mock/success',
    '/fubi/index/mock/success',
  ],
  req: [req, req],
});
