/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

const refactor = {
  data: {
    list: [
      {
        price: 'joinPrice',
        amount: 'joinNum',
      },
    ],
  },
};

const post = res => {};

seeFetch.config('master/project/list', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/wish/getWishProjectList',
    '/master/project/mock/list',
    '/master/project/mock/list',
  ],
  post: [post],
});
