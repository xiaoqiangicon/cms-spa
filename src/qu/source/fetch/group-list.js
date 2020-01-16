/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

const refactor = {
  data: 'data.list',
};

seeFetch.config('qu/source/groupList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/funtop/getGroupList',
    '/qu/source/mock/groupList1',
    '/qu/source/mock/groupList',
  ],
  refactor: [refactor, refactor],
});
