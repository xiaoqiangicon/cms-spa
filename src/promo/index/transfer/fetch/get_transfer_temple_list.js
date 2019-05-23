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
          name: 'subdivideName',
          buddhistId: 'commodityId',
          transferPrice: 'price',
          transferRate: 'percent',
          // fuBiRate: 'fuBiRate',
        }
      ]
    },
  ],
};

seeFetch.config('promo/index/transfer/getTransferTempleList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/conversionOrder/getTempleList',
    '/promo/index/transfer/mock/get_transfer_temple_list',
    '/promo/index/transfer/mock/get_transfer_temple_list',
  ],
  req: [req, req],
  refactor: [refactor, refactor],
});
