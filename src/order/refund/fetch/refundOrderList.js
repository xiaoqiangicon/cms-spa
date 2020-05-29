/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

const fromTypeTexts = ['APP', '微信'];
const finishTypeTexts = ['已完成', '处理中'];

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
  type: 1,
});

const post = res => {
  // res.total = 1;
  if (res.data) {
    res.data.forEach(item => {
      item.fromTypeText = fromTypeTexts[item.fromType];
      item.finishTypeText = finishTypeTexts[item.isFinish];
    });
  }
};

const postLocal = res => {
  res.data.forEach(item => {
    item.fromTypeText = fromTypeTexts[item.isChanzai];
    item.finishTypeText = finishTypeTexts[item.isFinish];
  });
};

seeFetch.config('order/refund/refundOrderList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/order/getApplicationRefundOrderList',
    '/order/refund/mock/refundOrderList',
    '/order/refund/mock/refundOrderList',
  ],
  req: [req, req],
  pre: [pre, pre],
  post: [post, post, postLocal],
});
