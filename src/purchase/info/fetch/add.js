/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

seeFetch.config('purchase/info/add', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/purchasing/addProject',
    '/purchase/info/mock/addProject',
    '/purchase/info/mock/addProject',
  ],
});
