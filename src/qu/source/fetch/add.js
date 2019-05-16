/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

const req = {
  account: 'wxid',
};

seeFetch.config('qu/source/add', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/funtop/addOrUpdateGzh',
    '/qu/source/mock/add1',
    '/qu/source/mock/add',
  ],
  req: [req, req],
});
