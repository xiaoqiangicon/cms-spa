import seeFetch from 'see-fetch';

const pre = params => ({ ...params, status: -1 });

seeFetch.config('ling/gift/delete', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/wish/addOrUpdateRichGift',
    '/ling/gift/mock/del1',
    '/ling/gift/mock/del',
  ],
  pre: [pre, pre],
});
