/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

const fromTypeTexts = ['微信', 'APP'];

const req = {
  startDate: 'startTime',
  endDate: 'endTime',
  search: 'orderNo',
  page: 'pageNum',
};

const pre = params => ({
  ...params,
  pageNum: params.pageNum - 1,
  pageSize: 10,
});

const refactor = {
  data: [
    {
      fromType: 'isChanzai',
      title: 'name',
      amount: 'price',
      time: 'payTime',
      selectItemName: 'subdivideName',
      count: 'num',
      prayType: 'buddhaWallType',
      placeSequence: 'place',
      flowNo: 'wxTransactionId',
      contactName: 'userName',
      contactPhone: 'mobile',
    },
  ],
};

const post = res => {
  res.total = 1;
  if (res.data) {
    res.data.forEach(item => {
      item.fromTypeText = fromTypeTexts[item.fromType];
    });
  }
};

const postLocal = res => {
  res.data.forEach(item => {
    item.fromTypeText = fromTypeTexts[item.fromType];
  });
};

seeFetch.config('order/refund/list', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/order/getRefundOrderList',
    '/order/refund/mock/list1',
    '/order/refund/mock/list',
  ],
  req: [req, req],
  pre: [pre, pre],
  refactor: [refactor, refactor],
  post: [post, post, postLocal],
});
