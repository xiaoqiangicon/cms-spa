import seeFetch from 'see-fetch';

const req = {
  buddhistId: 'commodityId',
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
          takeEffect: 'reviewConversion',
        },
      ],
    },
  ],
};

seeFetch.config('promo/index/transfer/getTransferTempleList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/conversionOrder/getConversionOrderTemple',
    '/promo/index/transfer/mock/get_transfer_temple_list',
    '/promo/index/transfer/mock/get_transfer_temple_list',
  ],
  req: [req, req],
  refactor: [refactor, refactor],
});
