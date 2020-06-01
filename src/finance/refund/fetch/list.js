/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

const fromTypeTexts = ['微信', 'APP'];
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
  type: 2,
});

const post = res => {
  res.total = res.data.length;
  if (res.data) {
    res.data.forEach(item => {
      item.fromTypeText = fromTypeTexts[item.isChanzai];
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

seeFetch.config('finance/refund/refundOrderList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/order/getApplicationRefundOrderList',
    '/finance/refund/mock/refundOrderList',
    '/finance/refund/mock/refundOrderList',
  ],
  req: [req, req],
  pre: [pre, pre],
  post: [post, post, postLocal],
});
