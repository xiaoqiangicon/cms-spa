import seeFetch from 'see-fetch';
import { ziYingTypes } from '../data';

const requestKeys = {
  search: 'searchContent',
  type: 'commodityType',
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
      profitAmount: 'earningsPrice', // 当前营收
      manualAmount: 'expenditurePrice', // 人工记录
      ended: 'isEnd',
    },
  ],
};

/* eslint-disable no-param-reassign */
const preHandle = req => {
  req.pageNum -= 1;
};

/* eslint-disable no-param-reassign */
const postHandle = res => {
  if (res.data && res.data.length) {
    res.data.forEach(item => {
      item.transformAmount = 0;
      item.usedAmount = item.manualAmount;
      // item.remainAmount = parseFloat(
      //   (
      //     item.amount -
      //     (item.amount * item.corporationProfitRate) / 100 -
      //     item.usedAmount
      //   ).toFixed(2)
      // );
      item.fullName = item.commodityId + ' - ' + item.commodityName;
      item.remainAmount = parseFloat(
        (item.amount - item.profitAmount - item.usedAmount).toFixed(2)
      );
      if (!item.type) item.type = 1;
      item.typeText = ziYingTypes.find(i => i.id === item.type).name;
    });
  }
};

const postLocal = res => {
  res.data.forEach(item => {
    item.typeText = ziYingTypes.find(i => i.id === item.type).name;
  });
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
  postHandle: [postHandle, postHandle, postLocal],
  preHandle: [preHandle, preHandle],
});
