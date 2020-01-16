import seeFetch from 'see-fetch';

const pre = params => ({ ...params, status: 0 });

seeFetch.config('qu/material/restore', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/funtop/updateUseArticle',
    '/qu/material/mock/restore1',
    '/qu/material/mock/restore',
  ],
  pre: [pre, pre],
});
