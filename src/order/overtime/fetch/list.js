/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

const fromTypeTexts = ['微信', 'APP'];

const post = res => {
  // res.total = 1;
  if (res.data.list) {
    res.data.list.forEach(item => {
      item.fromTypeText = fromTypeTexts[item.fromType];
      item.userComment = item.userComment || '-';
      item.videos = item.dispose_video_url
        ? item.dispose_video_url.split(',')
        : [];
      item.pics = item.dispose_pic_url ? item.dispose_pic_url.split(',') : [];
    });
  }
};

const refactor = {
  data: {
    list: [
      {
        fromType: 'isChanzai',
      },
    ],
  },
};

seeFetch.config('order/overtime/list', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/order/getZizaijiaCommodityOrderList',
    '/order/overtime/mock/list',
    '/order/overtime/mock/list',
  ],
  post: [post, post, post],
  refactor: [refactor, refactor],
});
