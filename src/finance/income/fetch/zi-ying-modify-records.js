import seeFetch from 'see-fetch';

const requestKeys = {
  foShiId: 'commodityId',
  page: 'pageNum',
};

const responseRefactor = {
  totalCount: 'data.cnt',
  data: 'data.list',
  _data: [
    {
      corporationProfitRate: 'percentage',
      editTime: 'addTime',
      editUser: 'account',
    },
  ],
};

/* eslint-disable no-param-reassign */
const preHandle = req => {
  req.pageNum -= 1;
  req.pageSize = 10;
};

seeFetch.config('finance/income/ziYingModifyRecords', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/earningsStatistics/getZizaihomeCommodityPercentageList',
    '/finance/income/mock/ziYingModifyRecords1',
    '/finance/income/mock/ziYingModifyRecords',
  ],
  requestKeys: [requestKeys, requestKeys],
  responseRefactor: [responseRefactor, responseRefactor],
  preHandle: [preHandle, preHandle],
});
