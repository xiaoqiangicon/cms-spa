import seeFetch from 'see-fetch';

const req = {
};

const refactor = {
  data: [
    {
      id: 'templeId',
      name: 'templeName',
    },
  ],
};

seeFetch.config('promo/merge_set/getTransferTempleList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/conversionOrder/getConversionOrderTemple',
    '/promo/merge_set/mock/get_transfer_temple_list',
    '/promo/merge_set/mock/get_transfer_temple_list',
  ],
  req: [req, req],
  refactor: [refactor, refactor],
});
