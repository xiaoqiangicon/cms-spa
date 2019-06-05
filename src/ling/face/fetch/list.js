/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';
import {types} from '../data';

const req = {
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
  _data: [
    {
      cover: 'pic',
      priority: 'sort',
      type: 'isLock',
    },
  ],
};

const post = res => {
  if (res.data)
    res.data.forEach(item => {
      item.typeText = types.find(i => i.id === (item.type || 0)).name;
    });
};

const localPost = res => {
  res.data.forEach(item => {
    item.typeText = types.find(i => i.id === (item.type || 0)).name;
  });
};

seeFetch.config('ling/face/list', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/wish/emotionList',
    '/ling/face/mock/list1',
    '/ling/face/mock/list',
  ],
  req: [req, req],
  pre: [pre, pre],
  refactor: [refactor, refactor],
  post: [post, post, localPost],
});
