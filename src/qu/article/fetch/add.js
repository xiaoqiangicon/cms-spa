/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

const req = {
  cover: 'pic',
  text: 'title',
  frequency: 'appearType',
  redirect: 'jumpType',
  link: 'jumpUrl',
  shareImageType: 'sharePicType',
  entryId: 'wishTypeId',
};

seeFetch.config('qu/article/add', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/wish/addOrUpdateWishAd',
    '/qu/article/mock/add1',
    '/qu/article/mock/add',
  ],
  req: [req, req],
});
