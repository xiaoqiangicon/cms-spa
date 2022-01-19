/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

// 获取寺院积分列表
seeFetch.config('temple/integration/getIntegralList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/blessCoin/templeCoinList',
    '/blessCoin/templeCoinList',
    '/blessCoin/templeCoinList',
  ],
});

const preHandle = req => {
  req.isTest = -1;
  req.tagId = 0;
  req.verify = -1;
  req.all = 1;
};

// 获取寺院列表
seeFetch.config('temple/integration/getTempleList', {
  method: ['post'],
  stringify: [!0],
  url: ['/temple/list', '/temple/list', '/temple/list'],
  preHandle: [preHandle, preHandle],
});
