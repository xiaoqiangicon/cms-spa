/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

const req = {
  name: 'groupName',
};

seeFetch.config('qu/source/groupAdd', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/funtop/addOrUpdateGroup',
    '/qu/source/mock/groupAdd1',
    '/qu/source/mock/groupAdd',
  ],
  req: [req, req],
});
