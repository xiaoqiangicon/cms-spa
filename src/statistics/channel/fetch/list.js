/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

const refactor = {
  data: [{}],
};

const post = res => {
  res.data.list.forEach(item => {
    item.remarkShow = !1;
  });
};

seeFetch.config('statistics/channel/list', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/stat/getChannelList',
    '/statistics/channel/mock/list',
    '/statistics/channel/mock/list',
  ],
  refactor: [refactor],
  post: [post],
});
