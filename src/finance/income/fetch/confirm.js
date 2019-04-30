import seeFetch from 'see-fetch';

const requestKeys = {
  id: 'contentId',
};

/* eslint-disable no-param-reassign */
const preHandle = req => {
  req.isEnd = 1;
};

seeFetch.config('finance/income/confirm', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/rate/updateEnd',
    '/finance/income/mock/confirm1',
    '/finance/income/mock/confirm',
  ],
  requestKeys: [requestKeys, requestKeys],
  preHandle: [preHandle, preHandle],
});
