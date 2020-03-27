/* eslint-disable no-param-reassign, prefer-destructuring, no-nested-ternary */
import seeFetch from 'see-fetch';
import { now } from '../../../../../pro-com/src/utils';
import '../../../com/refactor/slice';
import { numOfDate } from '../../../util';

const todayNum = numOfDate(now.date);

const statusTexts = ['进行中', '已下线', '未开始'];
const hideTexts = ['不隐藏', '隐藏'];

const req = {
  page: 'pageNum',
  status: 'type',
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
      hide: 'status',
      status: 'type',
      title: 'name',
      guardTags: 'guardTab',
      guardAvatar: 'guardImg',
      guardLargeAvatar: 'guardBigImg',
      guardIntro: 'guardDetail',
      guardBtn: 'buttonName',
      attachCover: 'pic',
      shareImage: 'shareImg',
      publishDate: 'beginTime|slice!0!10',
      endDate: 'endTime|slice!0!10',
      wishCount: 'wishNum',
      priority: 'top',
      bookmarkImage: 'bookMarkImg',
    },
  ],
};

const post = res => {
  if (res.data)
    res.data.forEach(item => {
      const publishDateNum = item.publishDate ? numOfDate(item.publishDate) : 0;
      const endDateNum = item.endDate ? numOfDate(item.endDate) : 0;

      if (!publishDateNum && !endDateNum) item.status = 1;
      else if (publishDateNum && endDateNum)
        item.status =
          todayNum >= publishDateNum ? (todayNum <= endDateNum ? 1 : 2) : 3;
      else if (publishDateNum) item.status = todayNum >= publishDateNum ? 1 : 3;
      else if (endDateNum) item.status = todayNum <= endDateNum ? 1 : 2;

      item.hideText = hideTexts[item.hide];
      item.statusText = statusTexts[item.status - 1];
    });
};

const localPost = res => {
  res.data.forEach(item => {
    item.hideText = hideTexts[item.hide];
    item.statusText = statusTexts[item.status - 1];
  });
};

seeFetch.config('ling/entry/list', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/wish/getWishTypeList',
    '/ling/entry/mock/list1',
    '/ling/entry/mock/list',
  ],
  req: [req, req],
  pre: [pre, pre],
  refactor: [refactor, refactor],
  post: [post, post, localPost],
});
