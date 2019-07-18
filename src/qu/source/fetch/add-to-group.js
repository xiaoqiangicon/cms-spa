/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

const req = {
  id: 'gzhId',
};

seeFetch.config('qu/source/addToGroup', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/funtop/addToGroup',
    '/qu/source/mock/addToGroup1',
    '/qu/source/mock/addToGroup',
  ],
  req: [req, req],
});
