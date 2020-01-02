import seeFetch from 'see-fetch';

// 获取弹窗广告列表
seeFetch.config('erpAD/getErpADList', {
  method: ['post'],
  stringify: [!0],
  url: ['/erpAD/getErpADList', '/erpAD/getErpADList'],
});

// 添加|编辑弹窗广告信息
seeFetch.config('erpAD/addAndUpdateErpAD', {
  method: ['post'],
  stringify: [!0],
  url: ['/erpAD/addAndUpdateErpAD', '/erpAD/addAndUpdateErpAD'],
});
