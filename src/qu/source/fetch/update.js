/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

const req = {
  account: 'wxid',
  interval: 'updateDays',
};

seeFetch.config('qu/source/update', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/funtop/addOrUpdateGzh',
    '/qu/source/mock/update1',
    '/qu/source/mock/update',
  ],
  req: [req, req],
});
