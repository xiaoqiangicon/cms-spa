/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

const req = {
  cover: 'pic',
  priority: 'sort',
  type: 'isLock',
};

seeFetch.config('ling/face/update', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/wish/addOrUpdateEmotion',
    '/ling/face/mock/update1',
    '/ling/face/mock/update',
  ],
  req: [req, req],
});
