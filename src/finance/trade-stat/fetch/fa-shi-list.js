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
  type: 1,
});

const responseRefactor = {
  totalCount: 'data.count',
  data: 'data.array',
  _data: [
    {
      orderNum: 'sign',
      wx_openid: 'wxOpenid',
      userName: 'name',
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

seeFetch.config('finance/trade-stat/faShiList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/wish/getWishOrderList',
    '/finance/trade-stat/mock/faShiList1',
    '/finance/trade-stat/mock/faShiList',
  ],
  requestKeys: [requestKeys, requestKeys],
  preHandle: [preHandle, preHandle],
  responseRefactor: [responseRefactor, responseRefactor],
  postHandle: [postHandle, postHandle],
});
