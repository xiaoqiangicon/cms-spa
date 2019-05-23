import seeFetch from 'see-fetch';

const requestKeys = {
  page: 'pageNumber',
  search: 'commodityId',
  status: 'isFinish',
};

const responseRefactor = {
  totalCount: 'data.count',
  data: 'data.list',
  _data: [
    {
      id: 'templeId',
      key: 'commodityId',
      foShiId: 'commodityId',
      foShiName: 'commodityName',
      serviceCharge: 'rate',
      takeEffectTime: 'startTime',
      lastEditTime: 'updateTime',
      lastEditUser: 'managerName',
      ended: 'isEnd',
      confirmed: 'isFinish',
      promoteRate: 'promotionPercentage',
      promoteAmount: 'promotionMoney',
      serviceRate: 'serviceMoney',
    },
  ],
};

/* eslint-disable no-param-reassign */
const preHandle = req => {
  req.pageSize = 10;
  if (req.isFinish === 2) req.isFinish = 0;
};

/* eslint-disable no-param-reassign */
const postHandle = res => {
  if (res.data && res.data.length) {
    res.data.forEach(item => {
      item.serviceCharge = parseFloat((item.serviceCharge * 100).toFixed(1)); // 最小 0.1
    });
  }
};

seeFetch.config('finance/income/listFoShi', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/rate/getCommodityList',
    '/finance/income/mock/listFoShi1',
    '/finance/income/mock/listFoShi',
  ],
  requestKeys: [requestKeys, requestKeys],
  responseRefactor: [responseRefactor, responseRefactor],
  postHandle: [postHandle, postHandle],
  preHandle: [preHandle, preHandle],
});
