/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';
import '../../../com/refactor/slice';

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
      content: 'details',
      startDate: 'startTime|slice!0!10',
      endDate: 'endTime|slice!0!10',
      priority: 'top',
    },
  ],
};

seeFetch.config('ling/fate/list', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/wish/starStrategyList',
    '/ling/fate/mock/list1',
    '/ling/fate/mock/list',
  ],
  req: [req, req],
  pre: [pre, pre],
  refactor: [refactor, refactor],
});
