import seeFetch from 'see-fetch';

const pre = params => ({ ...params, status: 0 });

seeFetch.config('ling/send/send', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/wish/addOrUpdateRichGift',
    '/ling/send/mock/send1',
    '/ling/send/mock/send',
  ],
  pre: [pre, pre],
});
