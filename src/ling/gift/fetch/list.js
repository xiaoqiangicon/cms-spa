/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';
import util from '@zzh/util';
import '../../../com/refactor/slice';
import { numOfDate } from '../../../util';

const { today } = util;

const typeTexts = ['话费', '现金'];

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
      date: 'giftDate|slice!0!10',
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

      item.beforeTomorrow = numOfDate(item.date) <= numOfDate(today.display);
    });
};

const localPost = res => {
  res.data.forEach(item => {
    item.typeText = typeTexts[item.type - 1];
  });
};

seeFetch.config('ling/gift/list', {
  method: ['post'],
  stringify: [!0],
  url: ['/wish/richGiftList', '/ling/gift/mock/list1', '/ling/gift/mock/list'],
  req: [req, req],
  pre: [pre, pre],
  refactor: [refactor, refactor],
  post: [post, post, localPost],
});
