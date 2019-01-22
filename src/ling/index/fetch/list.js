/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

const req = {
  page: 'pageNum',
};

const pre = params => ({
  ...params,
  pageNum: params.pageNum - 1,
  type: -1,
  pageSize: 10,
});

const refactor = {
  totalCount: 'data.count',
  data: 'data.list',
  _data: [
    {
      title: 'name',
      exchangePrice: 'coin',
      exchangeCount: 'exchangeNum',
      remainCount: 'stock',
      priority: 'sort',
    },
  ],
};

const post = res => {
  if (res.data)
    res.data.forEach(item => {
      item.cover = item.pic.split(',')[0];
    });
};

seeFetch.config('ling/index/list', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/wish/wishGiftList',
    '/ling/index/mock/list1',
    '/ling/index/mock/list',
  ],
  req: [req, req],
  pre: [pre, pre],
  refactor: [refactor, refactor],
  post: [post, post],
});
