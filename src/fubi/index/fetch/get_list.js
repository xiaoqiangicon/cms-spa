/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

const req = {
  typeId: 'type',
  page: 'pageNum',
  // pageSize: 'pageSize',
};

const pre = params => ({
  ...params,
  pageNum: params.pageNum - 1,
});

const refactor = {
  data: {
    // total: 'total',
    list: [
      {
        // id, sort
        buddhistId: 'commodityId',
        typeId: 'blessShopType',
        // name: 'name',
        fuBiMoney: 'payBlessCoin',
        exchangeTimes: 'payBlessCoinCnt',
      }
    ]
  }
};

seeFetch.config('fubi/index/get_list', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/blessCoinShop/getBlessCoinCommodityList',
    '/fubi/index/mock/get_list',
    '/fubi/index/mock/get_list',
  ],
  req: [req, req],
  pre: [pre, pre],
  refactor: [refactor, refactor],
});
