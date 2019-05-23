import seeFetch from 'see-fetch';

const req = {
  buddhistId: 'commodityId',
  transferTempleList: 'conversionOrderTemple',
  _transferTempleList: [
    {
      id: 'templeId',
      subList: 'subdivide',
      _subList: [
        {
          id: 'subdivideId',
          transferPrice: 'price',
          transferRate: 'percent'
        }
      ]
    }
  ]
};

seeFetch.config('promo/transfer_set/update_transfer_set', {
  method: ['post'],
  stringify: [!0, !0],
  url: [
    '/conversionOrder/addAndUpdateConversionOrderTemple',
    '/promo/transfer_set/mock/success',
    '/promo/transfer_set/mock/success',
  ],
  req: [req, req],
});
