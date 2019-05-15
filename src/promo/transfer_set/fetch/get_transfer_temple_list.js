import seeFetch from 'see-fetch';

const req = {
  buddhistId: 'commodityId'
};

const refactor = {
  data: [
    {
      id: 'templeId',
      name: 'templeName',
      subList: 'subdivide',
      _subList: [
        {
          id: 'subdivideId',
          buddhistId: 'commodityId',
          transferPrice: 'price',
          transferPercent: 'percent',
        }
      ]
    },
  ],
};

seeFetch.config('promo/transfer_set/getTransferTempleList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/conversionOrder/getTempleList',
    '/promo/transfer_set/mock/get_transfer_temple_list',
    '/promo/transfer_set/mock/get_transfer_temple_list',
  ],
  req: [req, req],
  refactor: [refactor, refactor],
});
