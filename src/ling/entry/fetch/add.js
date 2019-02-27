/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

const req = {
  hide: 'status',
  title: 'name',
  guardTags: 'guardTab',
  guardAvatar: 'guardImg',
  guardLargeAvatar: 'guardBigImg',
  guardIntro: 'guardDetail',
  guardBtn: 'buttonName',
  attachCover: 'pic',
  shareImage: 'shareImg',
  publishDate: 'beginTime',
  endDate: 'endTime',
  wishCount: 'wishNum',
  priority: 'top',
  bookmarkImage: 'bookMarkImg',
};

seeFetch.config('ling/entry/add', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/wish/addOrUpdateWishType',
    '/ling/entry/mock/add1',
    '/ling/entry/mock/add',
  ],
  req: [req, req],
});
