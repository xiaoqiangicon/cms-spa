/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

const req = {
  id: 'typeId',
};

seeFetch.config('fubi/index/delete_type', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/blessCoinShop/delBlessCoinShopType',
    '/fubi/index/mock/success',
    '/fubi/index/mock/success',
  ],
  req: [req, req],
});
