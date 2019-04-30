import seeFetch from 'see-fetch';

const requestKeys = {
  dimension: 'sumType',
  startDate: 'startTime',
  endDate: 'endTime',
};

const responseRefactor = {
  data: [
    {
      foShiName: 'commodityName',
      amount: 'orderMoney',
      profit: 'earningsMoney',
      yueGuangBaoHe: 'moonBoxMoney',
      chargeRate: 'templeFinancePercent',
      orderCount: 'orderNum',
      faShiProfit: 'bonzeMoney',
      time: 'incomeTime',
    },
  ],
};

const preHandle = req => {
  if (req.type === 2 || req.type === 3 || req.type === 7) req.sumType = 1;
};

/* eslint-disable no-param-reassign */
const postHandle = res => {
  res.totalCount = 1;
  if (res.data && res.data.length) {
    res.data.forEach((item, index) => {
      item.key = index + 1;
    });

    res.data.unshift({
      id: 0,
      key: 0,
      templeId: 0,
      templeName: '合计',
      foShiId: 0,
      foShiName: '合计',
      amount: res.data
        .map(item => item.amount)
        .reduce((sum, value) => sum + value)
        .toFixed(2),
      profit: res.data
        .map(item => item.profit)
        .reduce((sum, value) => sum + value)
        .toFixed(2),
      chargeRate: '-',
      yueGuangBaoHe: res.data
        .map(item => item.yueGuangBaoHe)
        .reduce((sum, value) => sum + value)
        .toFixed(2),
      manualRecord: res.data
        .map(item => item.manualRecord)
        .reduce((sum, value) => sum + value)
        .toFixed(2),
      orderCount: res.data
        .map(item => item.orderCount)
        .reduce((sum, value) => sum + value)
        .toFixed(2),
      faShiProfit: res.data
        .map(item => item.faShiProfit)
        .reduce((sum, value) => sum + value)
        .toFixed(2),
      time: '合计',
    });
  }
};

seeFetch.config('finance/income-stat/list', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/earningsStatistics/getEarningsList ',
    '/finance/income-stat/mock/list1',
    '/finance/income-stat/mock/list',
  ],
  requestKeys: [requestKeys, requestKeys],
  preHandle: [preHandle, preHandle],
  responseRefactor: [responseRefactor, responseRefactor],
  postHandle: [postHandle, postHandle],
});
