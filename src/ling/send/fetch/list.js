/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';
import '../../../com/refactor/slice';

const typeTexts = ['话费', '现金'];

const req = {
  page: 'pageNum',
};

const pre = params => ({
  ...params,
  pageNum: params.pageNum - 1,
  pageSize: 10,
  type: 2,
});

const refactor = {
  totalCount: 'data.count',
  data: 'data.list',
  _data: [
    {
      date: 'giftDate|slice!0!10',
      nickname: 'nickName',
      avatar: 'headImg',
    },
  ],
};

const post = res => {
  if (res.data)
    res.data.forEach(item => {
      if (item.cash) {
        item.type = 2;
        item.amount = item.cash;
      } else {
        item.type = 1;
        item.amount = item.telMoney;
      }
      item.typeText = typeTexts[item.type - 1];

      if (item.status === 0) item.send = 1;
      else item.send = 0;
    });
};

const localPost = res => {
  res.data.forEach(item => {
    item.typeText = typeTexts[item.type - 1];
  });
};

seeFetch.config('ling/send/list', {
  method: ['post'],
  stringify: [!0],
  url: ['/wish/richGiftList', '/ling/send/mock/list1', '/ling/send/mock/list'],
  req: [req, req],
  pre: [pre, pre],
  refactor: [refactor, refactor],
  post: [post, post, localPost],
});
