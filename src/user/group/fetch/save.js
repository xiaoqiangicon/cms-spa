import seeFetch from 'see-fetch';

seeFetch.config('user/group/save', {
  method: ['post', 'post', 'post'],
  stringify: [!0, !0, !0],
  url: [
    '/oprule/edit',
    '/src/user/group/mock/save',
    '/src/user/group/mock/save',
  ],
});
