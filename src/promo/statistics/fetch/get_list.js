import seeFetch from 'see-fetch';

const req = {
  // templeId: 'templeId',
  page: 'pageNumber',
  // pageSize: 'pageSize',
};

const pre = params => ({
  ...params,
  pageNumber: params.pageNumber - 1,
});

const refactor = {
  total: 'count',
  data: [
    {
      // id: 'id', // 寺院 id
      // name: 'name', // 寺院名
      transferOrderNum: 'conversionOrderNum', // 转单数
      transferOrderPrice: 'conversionOrderPrice', // 转单金额
      transferOrderGain: 'profitConversionOrderPrice', // 转单盈收
    },
  ],
};

seeFetch.config('promo/statistics/getList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/conversionOrder/relatingTempleList',
    '/promo/statistics/mock/get_list',
    '/promo/statistics/mock/get_list',
  ],
  req: [req, req],
  pre: [pre, pre],
  refactor: [refactor, refactor],
});
