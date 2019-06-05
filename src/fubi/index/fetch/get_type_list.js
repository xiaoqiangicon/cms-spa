/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

const req = {};

const refactor = {
  data: [
    {
      // id, name, sort, addTime, updateTime, status
    },
  ],
};

seeFetch.config('fubi/index/get_type_list', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/blessCoinShop/getBlessCoinShopTypeList',
    '/fubi/index/mock/get_type_list',
    '/fubi/index/mock/get_type_list',
  ],
  req: [req, req],
  refactor: [refactor, refactor],
});
