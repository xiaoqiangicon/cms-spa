import seeFetch from 'see-fetch';

const postHandle = res => {
  res.success = res.result >= 0;
  res.message = res.msg;
};

seeFetch.config('/temple/verify/saveVerifyData', {
  method: ['post'],
  stringify: [true],
  url: [
    '/application/edit',
    '/temple/temple-list/auth',
    '/temple/temple-list/auth',
  ],
  postHandle: [postHandle, postHandle],
});
