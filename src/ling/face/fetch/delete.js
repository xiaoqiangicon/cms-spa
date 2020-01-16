import seeFetch from 'see-fetch';

const pre = params => ({ ...params, status: -1 });

seeFetch.config('ling/face/delete', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/wish/addOrUpdateEmotion',
    '/ling/face/mock/del1',
    '/ling/face/mock/del',
  ],
  pre: [pre, pre],
});
