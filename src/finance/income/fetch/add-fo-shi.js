import seeFetch from 'see-fetch';

const requestKeys = {
  id: 'templeId',
  serviceCharge: 'rate',
  takeEffectTime: 'startTime',
  foShiId: 'contentId',
};

/* eslint-disable no-param-reassign */
const preHandle = req => {
  req.type = 2;
  req.rate = parseFloat((req.rate / 100).toFixed(3)); // 最小 0.1%
};

seeFetch.config('finance/income/addFoShi', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/rate/updateRate',
    '/finance/income/mock/addFoShi1',
    '/finance/income/mock/addFoShi',
  ],
  requestKeys: [requestKeys, requestKeys],
  preHandle: [preHandle, preHandle],
});
