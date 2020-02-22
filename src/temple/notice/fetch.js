/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

// 获取寺院列表
seeFetch.config('getTempleList', {
  method: ['post'],
  stringify: [!0],
  url: ['/temple/list', '/temple/list', '/temple/list'],
});

// 获取寺院推送信息列表
seeFetch.config('getTempleMessage', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/temple/getTempleMessage',
    '/temple/getTempleMessage',
    '/temple/getTempleMessage',
  ],
});

// 推送寺院消息
seeFetch.config('pushTempleMessage', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/temple/pushTempleMessage',
    '/temple/pushTempleMessage',
    '/temple/pushTempleMessage',
  ],
});
