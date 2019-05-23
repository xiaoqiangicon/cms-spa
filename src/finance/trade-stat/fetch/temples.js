import seeFetch from 'see-fetch';

const preHandle = req => {
  req.verify = 1;
  req.isTest = 1;
  req.tagId = 0;
};

seeFetch.config('finance/trade-stat/temples', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/temple/list/',
    '/finance/trade-stat/mock/temples1',
    '/finance/trade-stat/mock/temples',
  ],
  preHandle: [preHandle, preHandle],
});
