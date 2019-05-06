import seeFetch from 'see-fetch';

const requestKeys = {
  page: 'pageNum',
  startDate: 'startTime',
  endDate: 'endTime',
  search: 'userName',
};

const preHandle = req => ({ ...req, pageNum: req.pageNum - 1, pageSize: 10 });

const responseRefactor = {
  totalCount: 'data.count',
  data: 'data.list',
  _data: [
    {
      orderNum: 'orderNo',
      wx_openid: 'wxOpenId',
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

seeFetch.config('finance/trade-stat/fenXiaoList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/wish/promotionPickUpList',
    '/finance/trade-stat/mock/fenXiaoList1',
    '/finance/trade-stat/mock/fenXiaoList',
  ],
  requestKeys: [requestKeys, requestKeys],
  preHandle: [preHandle, preHandle],
  responseRefactor: [responseRefactor, responseRefactor],
  postHandle: [postHandle, postHandle],
});
