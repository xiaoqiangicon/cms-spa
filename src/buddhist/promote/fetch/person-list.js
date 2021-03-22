/* eslint-disable no-param-reassign, prefer-destructuring, no-nested-ternary */
import seeFetch from 'see-fetch';

const post = res => {
  res.data.forEach((item, key) => {
    item.name = item.id + ' - ' + item.name;
  });
};

seeFetch.config('buddhist/promote/personList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/video/commodityListSimple',
    '/buddhist/promote/mock/personList',
    '/buddhist/promote/mock/personList',
  ],
});
