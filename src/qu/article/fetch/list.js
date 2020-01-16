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
      wxAccount: 'accounts',
      wxAuthor: 'author',
      content: 'articleHtml',
      contentText: 'articleText',
      addedToLibrary: 'isUse',
      pullTime: 'pullTime',
      addedVideoToLibrary: 'isUseVideo',
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

      if (item.articleImg) {
        item.cover = item.articleImg.split(',')[0];
      }
      item.hasImages = !!item.articleImg;
      item.hasVideos = !!item.articleVideo;
    });
};

const localPost = res => {
  res.data.forEach(item => {
    item.shortContentText = item.contentText
      ? item.contentText.slice(0, 40)
      : '';
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
