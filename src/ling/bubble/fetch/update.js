/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

const req = {
  cover: 'pic',
  text: 'title',
  frequency: 'appearType',
  redirect: 'jumpType',
  link: 'jumpUrl',
  shareImageType: 'sharePicType',
};

seeFetch.config('ling/bubble/update', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/wish/addOrUpdateWishAd',
    '/ling/bubble/mock/update1',
    '/ling/bubble/mock/update',
  ],
  req: [req, req],
});
