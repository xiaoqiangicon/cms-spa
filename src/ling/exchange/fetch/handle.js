import seeFetch from 'see-fetch';

const req = {
  expressCompany: 'deliveryCompany',
  expressNumber: 'deliveryNumber',
  feedImages: 'processPic',
  memo: 'remark',
};

const pre = params => ({ ...params, status: 1 });

seeFetch.config('ling/exchange/handle', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/wish/processWishGift',
    '/ling/exchange/mock/handle1',
    '/ling/exchange/mock/handle',
  ],
  req: [req, req],
  pre: [pre, pre],
});
