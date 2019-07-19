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
  _data: [
    {
      account: 'wxid',
      interval: 'updateDays',
      lastPullTime: 'lastUpdateTime',
    },
  ],
};

const post = res => {
  if (res.data) {
    res.data.forEach(item => {
      if (!item.groupId) item.groupId = 0;
    });
  }
};

seeFetch.config('qu/source/list', {
  method: ['post'],
  stringify: [!0],
  url: ['/funtop/getGzhList', '/qu/source/mock/list1', '/qu/source/mock/list'],
  req: [req, req],
  pre: [pre, pre],
  refactor: [refactor, refactor],
  post: [post, post],
});
