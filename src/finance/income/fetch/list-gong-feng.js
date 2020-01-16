import seeFetch from 'see-fetch';

const responseRefactor = {
  data: [
    {
      id: 'templeId',
      key: 'templeId',
      serviceCharge: 'rate',
      takeEffectTime: 'startTime',
      lastEditTime: 'updateTime',
      lastEditUser: 'managerName',
    },
  ],
};

/* eslint-disable no-param-reassign */
const postHandle = res => {
  res.totalCount = 1;
  if (res.data && res.data.length) {
    res.data.forEach(item => {
      item.serviceCharge = parseFloat((item.serviceCharge * 100).toFixed(1)); // 最小 0.1
    });
  }
};

seeFetch.config('finance/income/listGongFeng', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/rate/getWallTemple',
    '/finance/income/mock/listGongFeng1',
    '/finance/income/mock/listGongFeng',
  ],
  responseRefactor: [responseRefactor, responseRefactor],
  postHandle: [postHandle, postHandle],
});
