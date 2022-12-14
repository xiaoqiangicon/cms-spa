/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';
import { publishAccounts, statuses } from '../data';

const req = {
  search: 'content',
  publishAccount: 'pushAccount',
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
      covers: 'titleImg',
      content: 'articleHtml',
      contentText: 'articleText',
      jsonContent: 'articleJson',
      publishAccount: 'pushAccount',
      region: 'area',
      publishAuthor: 'printAuthor',
      original: 'isOriginal',
      createdAt: 'addTime',
      videos: 'articleVideo',
      videoDesc: 'videoDetails',
      publishTime: 'pullTime',
    },
  ],
};

const post = res => {
  if (res.data)
    res.data.forEach(item => {
      item.content = item.content.trim();
      item.shortContentText = item.contentText
        ? item.contentText.slice(0, 40)
        : '';
      item.statusText = statuses.find(i => i.id === item.status).name;

      if (!item.publishAccount) item.publishAccount = 1;
      item.publishAccountText = publishAccounts.find(
        i => i.id === item.publishAccount
      ).name;

      if (!item.publishAuthor) item.publishAuthor = '自在家';

      item.cover = item.covers ? item.covers.split(',')[0] : '';
      if (!item.video) {
        item.video = item.videos ? item.videos.split(',')[0] : '';
      }
    });
};

const localPost = res => {
  res.data.forEach(item => {
    item.shortContentText = item.contentText
      ? item.contentText.slice(0, 40)
      : '';
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
    '/funtop/getUseList',
    '/qu/material/mock/list1',
    '/qu/material/mock/list',
  ],
  req: [req, req],
  pre: [pre, pre],
  refactor: [refactor, refactor],
  post: [post, post, localPost],
});
