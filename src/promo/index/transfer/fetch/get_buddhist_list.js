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
        }
      ]
    },
  ],
};

seeFetch.config('promo/index/transfer/getBuddhistList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/conversionOrder/commodityGetList',
    '/promo/index/transfer/mock/get_buddhist_list',
    '/promo/index/transfer/mock/get_buddhist_list',
  ],
  req: [req, req],
  refactor: [refactor, refactor],
});
