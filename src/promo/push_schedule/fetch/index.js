import seeFetch from 'see-fetch';

//获取发布进展列表
seeFetch.config('ceremony/getScheduleCommodityList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/ceremony/getScheduleCommodityList',
    '/ceremony/getScheduleCommodityList',
  ],
});

//获取进展列表
seeFetch.config('ceremony/getScheduleList', {
  method: ['post'],
  stringify: [!0],
  url: ['/ceremony/getScheduleList', '/ceremony/getScheduleList'],
});

//添加和更新佛事进展
seeFetch.config('addCommoditySchedule', {
  method: ['post'],
  stringify: [!0],
  url: ['/ceremony/addCommoditySchedule', '/ceremony/addCommoditySchedule'],
});
