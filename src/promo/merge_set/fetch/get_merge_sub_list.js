import seeFetch from 'see-fetch';

const req = {
  buddhistId: 'commodityId'
};

const refactor = {
  data: [
    {
      // id: 'id',
      // name: 'name',
      subList: 'conversionSubdivide',
      _subList: [
        {
          // templeId: 'templeId',
          buddhistId: 'commodityId',
          subId: 'subdivideId',
          subName: 'name',
          // price: 'price',
        }
      ]
    },
  ],
};

seeFetch.config('promo/merge_set/getMergeSubList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/conversionOrder/getConversionSubdivideList',
    '/promo/merge_set/mock/get_merge_sub_list',
    '/promo/merge_set/mock/get_merge_sub_list',
  ],
  req: [req, req],
  refactor: [refactor, refactor],
});
