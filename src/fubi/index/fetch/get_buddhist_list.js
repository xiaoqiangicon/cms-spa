/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

const req = {
};

const refactor = {
  data: [
    {
      // id, name
    }
  ]
};

seeFetch.config('fubi/index/get_buddhist_list', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/blessCoinShop/getZizaihaowuCommodityList',
    '/fubi/index/mock/get_buddhist_list',
    '/fubi/index/mock/get_buddhist_list',
  ],
  req: [req, req],
  refactor: [refactor, refactor],
});
