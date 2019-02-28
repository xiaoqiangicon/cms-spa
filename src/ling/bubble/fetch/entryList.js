/* eslint-disable no-param-reassign, prefer-destructuring, no-nested-ternary */
import seeFetch from 'see-fetch';

const pre = () => ({
  pageNum: 0,
  pageSize: 100,
});

const refactor = {
  totalCount: 'data.count',
  data: 'data.list',
  _data: [
    {
      title: 'name',
    },
  ],
};

seeFetch.config('ling/bubble/entryList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/wish/getWishTypeList',
    '/ling/entry/mock/list1',
    '/ling/entry/mock/list',
  ],
  pre: [pre, pre],
  refactor: [refactor, refactor],
});
