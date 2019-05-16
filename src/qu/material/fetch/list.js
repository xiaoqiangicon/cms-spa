/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';
import { publishAccounts, statuses } from '../data';

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
  _data: [{}],
};

const post = res => {
  if (res.data)
    res.data.forEach(item => {
      item.shortContent = item.content ? item.content.slice(0, 40) : '';
      item.statusText = statuses.find(i => i.id === item.status).name;
      item.publishAccountText = publishAccounts.find(
        i => i.id === item.publishAccount
      ).name;
    });
};

const localPost = res => {
  res.data.forEach(item => {
    item.shortContent = item.content ? item.content.slice(0, 40) : '';
    item.statusText = statuses.find(i => i.id === item.status).name;
    item.publishAccountText = publishAccounts.find(
      i => i.id === item.publishAccount
    ).name;
  });
};

seeFetch.config('qu/material/list', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/wish/wishAdList',
    '/qu/material/mock/list1',
    '/qu/material/mock/list',
  ],
  req: [req, req],
  pre: [pre, pre],
  refactor: [refactor, refactor],
  post: [post, post, localPost],
});
