import seeFetch from 'see-fetch';

const pre = params => ({ ...params, status: -1 });

seeFetch.config('qu/source/groupDelete', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/funtop/addOrUpdateGroup',
    '/qu/source/mock/groupDel1',
    '/qu/source/mock/groupDel',
  ],
  pre: [pre, pre],
});
