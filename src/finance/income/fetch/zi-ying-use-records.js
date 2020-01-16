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
      desc: 'content',
      amount: 'price',
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

seeFetch.config('finance/income/ziYingUseRecords', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/earningsStatistics/getExpenditureList',
    '/finance/income/mock/ziYingUseRecords1',
    '/finance/income/mock/ziYingUseRecords',
  ],
  requestKeys: [requestKeys, requestKeys],
  responseRefactor: [responseRefactor, responseRefactor],
  preHandle: [preHandle, preHandle],
});
