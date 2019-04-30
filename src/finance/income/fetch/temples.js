import seeFetch from 'see-fetch';

const preHandle = req => {
  req.verify = 1;
  req.isTest = 1;
  req.tagId = 0;
};

seeFetch.config('finance/income/temples', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/temple/list/',
    '/finance/income/mock/temples1',
    '/finance/income/mock/temples',
  ],
  preHandle: [preHandle, preHandle],
});
