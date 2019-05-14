import seeFetch from 'see-fetch';

const refactor = {
  data: [
    {
      // id: 'id',
      // name: 'name',
    },
  ],
};

const post = () => {};

seeFetch.config('promo/index/transfer/getBuddhistList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/conversionOrder/conversionOrderCommodityGetList',
    '/promo/index/transfer/mock/get_buddhist_list',
    '/promo/index/transfer/mock/get_buddhist_list',
  ],
  refactor: [refactor, refactor],
  post: [post, post],
});
