/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

const req = {
  name: 'groupName',
};

seeFetch.config('qu/source/groupUpdate', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/funtop/addOrUpdateGroup',
    '/qu/source/mock/groupUpdate1',
    '/qu/source/mock/groupUpdate',
  ],
  req: [req, req],
});
