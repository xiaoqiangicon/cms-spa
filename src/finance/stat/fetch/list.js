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
  if (res.data)
    res.data.forEach(item => {
      const dates = item.add_time.split('-');
      item.year = parseInt(dates[0], 10);
      item.month = parseInt(dates[1], 10);
      item.remain = (item.income - item.taken).toFixed(2);
    });
};

seeFetch.config('finance/stat/list', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/finance/getMoneyCntList',
    '/finance/stat/mock/list1',
    '/finance/stat/mock/list',
  ],
  refactor: [refactor, refactor],
  post: [post, post],
});
