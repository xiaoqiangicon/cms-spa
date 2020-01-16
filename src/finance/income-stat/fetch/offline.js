import seeFetch from 'see-fetch';

const responseRefactor = {
  total: 'data.totalManualRecordMoney',
  yearTotal: 'data.yearManualRecordMoney',
  monthTotal: 'data.monthManualRecordMoney',
};

/* eslint-disable no-param-reassign */
const postHandle = res => {
  res.yearList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  if (res.data.monthManualRecordMoneyList) {
    res.data.monthManualRecordMoneyList.forEach(item => {
      res.yearList[parseInt(item.getDate.split('-')[1], 10) - 1] = parseFloat(
        parseFloat(item.money).toFixed(2)
      );
    });
  }
};

seeFetch.config('finance/income-stat/offline', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/earningsStatistics/getManualRecordTotal',
    '/finance/income-stat/mock/offline1',
    '/finance/income-stat/mock/offline',
  ],
  responseRefactor: [responseRefactor, responseRefactor],
  postHandle: [postHandle, postHandle],
});
