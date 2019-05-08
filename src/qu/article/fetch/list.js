/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';
import { readableTime } from '@zzh/n-util';

const req = {
  page: 'pageNum',
};

const pre = params => ({
  ...params,
  pageNum: params.pageNum - 1,
});

const refactor = {};

const post = res => {
  res.data.list.forEach(item => {
    item.timeStr = readableTime(item.time);
  });
};

seeFetch.config('qu/article/list', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/wish/wishGiftList',
    '/qu/article/mock/list1',
    '/qu/article/mock/list',
  ],
  req: [req, req],
  pre: [pre, pre],
  refactor: [refactor, refactor],
  post: [post, post],
});
