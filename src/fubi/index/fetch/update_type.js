/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

const req = {
  id: 'typeId',
  // name: 'name',
  // sort: 'sort',
};

seeFetch.config('fubi/index/update_type', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/blessCoinShop/addAndUpdateBlessCoinShopType',
    '/fubi/index/mock/success',
    '/fubi/index/mock/success',
  ],
  req: [req, req],
});
