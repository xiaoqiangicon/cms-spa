import seeFetch from 'see-fetch';

const req = {
  id: 'templeId',
};

const refactor = {
  data: [
    {
      // id: 'id',
      // name: 'name',
      subList: 'subdivides',
      _subList: [
        {
          // id: 'id',
          name: 'subdivideName',
          // price: 'price',
        }
      ]
    },
  ],
};

seeFetch.config('promo/merge_set/getBuddhistList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/conversionOrder/commodityGetList',
    '/promo/merge_set/mock/get_buddhist_list',
    '/promo/merge_set/mock/get_buddhist_list',
  ],
  req: [req, req],
  refactor: [refactor, refactor],
});
