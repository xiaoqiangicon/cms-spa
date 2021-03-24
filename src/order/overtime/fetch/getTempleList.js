/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

const post = res => {
  if (res.data) {
    res.data.map(item => {
      item.name = `${item.id} - ${item.name}`;
      return item;
    });
  }
};

seeFetch.config('order/overtime/templeList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/temple/list',
    '/order/overtime/mock/templeList',
    '/order/overtime/mock/templeList',
  ],
  post: [post, post, post],
});
