import seeFetch from 'see-fetch';

const req = {
  buddhistId: 'commodityId',
  transferTempleList: 'conversionOrderTemple', // 下方的规则插件没有应用到
  // _transferTempleList: [
  //   {
  //     id: 'templeId',
  //     subList: 'subdivide',
  //     _subList: [
  //       {
  //         id: 'subdivideId',
  //         transferPrice: 'price',
  //         transferRate: 'percent'
  //       }
  //     ],
  //   }
  // ],
};

const pre = params => {
  const res = {};
  res.commodityId = params.commodityId;
  res.conversionOrderTemple = params.conversionOrderTemple.map(item => ({
    templeId: item.id,
    subdivide: item.subList.map(sub => ({
      subdivideId: sub.id,
      price: sub.transferPrice,
      percent: sub.transferRate,
      isDel: sub.isDel,
    })),
    isDel: item.isDel,
  }));
  return res;
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
  pre: [pre, pre],
});
