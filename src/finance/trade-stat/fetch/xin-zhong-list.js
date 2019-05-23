import seeFetch from 'see-fetch';

const requestKeys = {
  page: 'pageNum',
  startDate: 'startTime',
  endDate: 'endTime',
};

const preHandle = req => ({
  ...req,
  pageNum: req.pageNum - 1,
  pageSize: 10,
  type: 0,
});

const responseRefactor = {
  totalCount: 'data.count',
  data: 'data.array',
  _data: [
    {
      shopNum: 'orderNo',
      amount: 'money',
      createdAt: 'addTime',
    },
  ],
};

/* eslint-disable no-param-reassign */
const postHandle = res => {
  if (res.data && res.data.length)
    res.data.forEach((item, index) => {
      item.key = index + 1;
    });
};

seeFetch.config('finance/trade-stat/xinZhongList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/wish/getWishOrderList',
    '/finance/trade-stat/mock/xinZhongList1',
    '/finance/trade-stat/mock/xinZhongList',
  ],
  requestKeys: [requestKeys, requestKeys],
  preHandle: [preHandle, preHandle],
  responseRefactor: [responseRefactor, responseRefactor],
  postHandle: [postHandle, postHandle],
});
