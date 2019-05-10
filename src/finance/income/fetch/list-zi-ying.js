import seeFetch from 'see-fetch';

const requestKeys = {
  page: 'pageNum',
};

const responseRefactor = {
  totalCount: 'data.cnt',
  data: 'data.list',
  _data: [
    {
      id: 'templeId',
      foShiId: 'commodityId',
      foShiName: 'commodityName',
      amount: 'price', // 订单总额
      corporationProfitRate: 'dividedPricePercentage', // 企业分成
      profitAmount: 'earningsPrice', // 当前盈收
      manualAmount: 'expenditurePrice', // 人工记录
      ended: 'isEnd',
    },
  ],
};

/* eslint-disable no-param-reassign */
const preHandle = req => {
  req.pageNum -= 1;
  req.pageSize = 10;
};

/* eslint-disable no-param-reassign */
const postHandle = res => {
  if (res.data && res.data.length) {
    res.data.forEach(item => {
      item.transformAmount = 0;
      item.usedAmount = item.manualAmount;
      item.remainAmount = parseFloat(
        (
          (item.amount * item.corporationProfitRate) / 100 -
          item.usedAmount
        ).toFixed(2)
      );
    });
  }
};

seeFetch.config('finance/income/listZiYing', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/earningsStatistics/getZizaihomeCommodityList',
    '/finance/income/mock/listZiYing1',
    '/finance/income/mock/listZiYing',
  ],
  requestKeys: [requestKeys, requestKeys],
  responseRefactor: [responseRefactor, responseRefactor],
  postHandle: [postHandle, postHandle],
  preHandle: [preHandle, preHandle],
});
