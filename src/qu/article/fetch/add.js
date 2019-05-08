import seeFetch from 'see-fetch';

const req = {};

const pre = () => {};

const refactor = {};

const post = () => {};

seeFetch.config('qu/article/add', {
  method: ['post'],
  stringify: [!0],
  url: ['/wish/wishGiftList', '/qu/article/mock/add1', '/qu/article/mock/add'],
  req: [req, req],
  pre: [pre, pre],
  refactor: [refactor, refactor],
  post: [post, post],
});
