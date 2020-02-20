/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

// 获取积分活动列表
seeFetch.config('getIntegralList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/temple/getTempleMissionList',
    '/temple/getTempleMissionList',
    '/temple/getTempleMissionList',
  ],
});

// 添加和编辑积分活动
seeFetch.config('addOrEditIntegral', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/temple/addAndUpdateTempleMission',
    '/temple/addAndUpdateTempleMission',
    '/temple/addAndUpdateTempleMission',
  ],
});

// 发布或者删除积分活动
seeFetch.config('updateIntegralStatus', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/temple/updateTempleMissionStatus',
    '/temple/updateTempleMissionStatus',
    '/temple/updateTempleMissionStatus',
  ],
});
