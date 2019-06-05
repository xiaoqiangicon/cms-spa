/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

const req = {
  buddhistId: 'commodityId',
  // startTime, endTime,
  searchStr: 'searchContent',
  page: 'pageNum',
  // pageSize: 'pageSize',
};

const pre = params => ({
  ...params,
  pageNum: params.pageNum - 1,
});

const refactor = {
  data: {
    total: 'total',
    list: [
      {
        // id, payTime, name
        payMoney: 'price', // 支付金额
        fuBiMoney: 'shareBlessCoin', // 获得福币金额
        nickname: 'nickName', // 获得福币的用户名
        tel: 'mobile', // 获得福币的用户手机号码
      },
    ],
  },
};

seeFetch.config('promo/fubi_record/get_list', {
  method: ['post'],
  stringify: [!0],
  url: [
    'blessCoinShop/getBlessCoinShareRecord',
    '/promo/fubi_record/mock/get_list',
    '/promo/fubi_record/mock/get_list',
  ],
  req: [req, req],
  pre: [pre, pre],
  refactor: [refactor, refactor],
});
