/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

let typeText = ['线下活动', '短信群发', '专题页'];

const post = res => {
  res.data.list.forEach(item => {
    item.typeText = typeText[item.type - 1];
  });
};

seeFetch.config('getShortUrlPage', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/event/getShortUrlPage',
    '/tool/link/short-link/getShortUrlPage',
    '/tool/link/short-link/getShortUrlPage',
  ],
  post: [post, post, post],
});
