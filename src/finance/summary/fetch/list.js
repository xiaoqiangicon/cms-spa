/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

const req = {
  page: 'pageNumber',
  startDate: 'startTime',
  endDate: 'endTime',
  subId: 'commodityId',
};

const pre = params => ({
  ...params,
  pageNumber: params.pageNumber - 1,
  pageSize: 10,
});

const refactor = {
  data: [
    {
      time: 'add_time',
      showId: 'wx_transaction_id',
      amount: 'price',
    },
  ],
};

const post = res => {
  res.totalCount = (res.pageSum || 1) * 10;
};

seeFetch.config('finance/summary/list', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/finance/getTransactionRecordList',
    '/finance/summary/mock/list1',
    '/finance/summary/mock/list',
  ],
  req: [req, req],
  pre: [pre, pre],
  refactor: [refactor, refactor],
  post: [post, post],
});
