/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

const fromTypeTexts = ['微信', 'APP'];
const finishTypeTexts = ['处理中', '已完成'];

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

const post = res => {
  // res.total = 1;
  if (res.data) {
    res.data.forEach(item => {
      item.fromTypeText = fromTypeTexts[item.isChanzai];
      item.finishTypeText = finishTypeTexts[item.isFinish];
      if (item.disposePicUrl) {
        item.pics = item.disposePicUrl.split(',');
      } else {
        item.pics = [];
      }
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
