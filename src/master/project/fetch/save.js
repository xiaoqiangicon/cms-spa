/* eslint-disable no-param-reassign */
import seeFetch from 'see-fetch';

seeFetch.config('master/edit/save', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/wish/addAndUpdateWishProject',
    '/master/edit/mock/save',
    '/master/edit/mock/save',
  ],
});
