/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

const req = {
  search: 'content',
  page: 'pageNum',
};

const pre = params => ({
  ...params,
  pageNum: params.pageNum - 1,
  pageSize: 10,
});

const refactor = {
  totalCount: 'data.count',
  data: 'data.list',
  _data: [{}],
};

const post = res => {
  if (res.data)
    res.data.forEach(item => {
      item.shortContent = item.content ? item.content.slice(0, 40) : '';
    });
};

const localPost = res => {
  res.data.forEach(item => {
    item.shortContent = item.content ? item.content.slice(0, 40) : '';
  });
};

seeFetch.config('qu/article/list', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/funtop/getPullList',
    '/qu/article/mock/list1',
    '/qu/article/mock/list',
  ],
  req: [req, req],
  pre: [pre, pre],
  refactor: [refactor, refactor],
  post: [post, post, localPost],
});
