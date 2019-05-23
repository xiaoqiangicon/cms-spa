import seeFetch from 'see-fetch';

const requestKeys = {
  id: 'templeId',
};

const responseRefactor = {
  data: [
    {
      serviceCharge: 'rate',
      takeEffectTime: 'startTime',
      editTime: 'addTime',
      editUser: 'managerName',
    },
  ],
};

/* eslint-disable no-param-reassign */
const preHandle = req => {
  req.type = 4;
};

/* eslint-disable no-param-reassign */
const postHandle = res => {
  res.totalCount = 1;
  if (res.data && res.data.length) {
    res.data.forEach((item, index) => {
      item.key = index + 1;
      item.serviceCharge = parseFloat((item.serviceCharge * 100).toFixed(1)); // 最小 0.1
    });
  }
};

seeFetch.config('finance/income/recordsGongFeng', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/rate/recordList',
    '/finance/income/mock/recordsGongFeng1',
    '/finance/income/mock/recordsGongFeng',
  ],
  requestKeys: [requestKeys, requestKeys],
  responseRefactor: [responseRefactor, responseRefactor],
  preHandle: [preHandle, preHandle],
  postHandle: [postHandle, postHandle],
});
