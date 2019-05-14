import seeFetch from 'see-fetch';

const req = {};

const pre = params => ({
  ...params,
  templeId: 0,
});

const refactor = {
  data: [
    {
      id: 'id',
      name: 'name',
    },
  ],
};

const post = () => {};

seeFetch.config('promo/index/getTransferAddBuddhistList', {
  method: ['post'],  
  stringify: [!0],
  url: [
    '/conversionOrder/commodityGetList',
    '/promo/index/transfer/mock/get_transfer_add_buddhist_list',
    '/promo/index/transfer/mock/get_transfer_add_buddhist_list',
  ],
  req: [req, req],
  pre: [pre, pre],
  refactor: [refactor, refactor],
  post: [post, post],
});
