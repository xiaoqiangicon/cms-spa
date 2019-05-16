/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

seeFetch.config('qu/article/add', {
  method: ['post'],
  stringify: [!0],
  url: ['/funtop/addToUse', '/qu/article/mock/add1', '/qu/article/mock/add'],
});
