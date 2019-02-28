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

seeFetch.config('ling/bubble/add', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/wish/addOrUpdateWishAd',
    '/ling/bubble/mock/add1',
    '/ling/bubble/mock/add',
  ],
  req: [req, req],
});
