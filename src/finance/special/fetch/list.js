/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

const req = {
  page: 'pageNumber',
};

const pre = params => ({
  ...params,
  pageNumber: params.pageNumber - 1,
  pageSize: 10,
});

const refactor = {
  data: [
    {
      takeId: 'pickUpId',
      time: 'addTime',
      typeName: 'commodityName',
      money: 'price',
      timeRegion: 'timeStr',
      amount: 'price',
      // 1: 表示提现中，0：表示未在提现中
      handling: 'isCashWithdrawal',
    },
  ],
};

const post = res => {
  res.totalCount = (res.pageSum || 1) * 10;
};

seeFetch.config('finance/special/list', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/finance/getSpecialRecordList',
    '/finance/special/mock/list1',
    '/finance/special/mock/list',
  ],
  req: [req, req],
  pre: [pre, pre],
  refactor: [refactor, refactor],
  post: [post, post],
});
