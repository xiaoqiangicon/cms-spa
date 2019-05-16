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

seeFetch.config('qu/source/update', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/wish/addOrUpdateWishAd',
    '/qu/source/mock/update1',
    '/qu/source/mock/update',
  ],
  req: [req, req],
});
