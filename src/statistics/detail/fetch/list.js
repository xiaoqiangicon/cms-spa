/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

const refactor = {
  totalIncome: 'price',
  totalTaken: 'pickMoney',
  canTake: 'canPickUpMoney',
  cantTake: 'notPickMoney',
  data: [
    {
      income: 'price',
      count: 'cnt',
      available: 'canPickUpMoney',
      taken: 'pickMoney',
    },
  ],
};

const post = res => {
  if (res.data) res.data.forEach(item => {});
};

seeFetch.config('statistics/detail/list', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/statistics/getMoneyCntList',
    '/statistics/detail/mock/list',
    '/statistics/detail/mock/list',
  ],
  refactor: [refactor, refactor],
  post: [post, post],
});
