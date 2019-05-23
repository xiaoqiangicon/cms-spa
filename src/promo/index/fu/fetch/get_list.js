/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

const req = {
  // type: 'type', // 0 全部 1 转单佛事 2 推广佛事
  // isFinish: 'isFinish', // 0 1
  page: 'pageNumber',
  // pageSize: 'pageSize',
};

const pre = params => ({
  ...params,
  pageNum: params.pageNum - 1,
});

const refactor = {
  data: {
    total: 'count',
    list: [
      {
        // id: 'id',
        // sort: 'sort',
        // buddhistName: 'buddhistName',
        // templeName: 'templeName',
        // type: 'type',
        // orderNum: 'orderNum',
        // sharePay: 'sharePay',
        // fuBiMoney: 'fuBiMoney',
      }
    ]
  }
};

seeFetch.config('promo/index/fu/get_list', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/wish/wishGiftList',
    '/promo/index/fu/mock/get_list',
    '/promo/index/fu/mock/get_list',
  ],
  req: [req, req],
  pre: [pre, pre],
  refactor: [refactor, refactor],
});
