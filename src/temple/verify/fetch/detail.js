import seeFetch from 'see-fetch';

const postHandle = res => {
  res.success = res.result >= 0;
  res.message = res.msg;
};

const post = res => {
  let rightList = [];
  let detail = res.data;
  for (key in detail) {
    if (key.indexOf('pw_') > -1 && detail[key]) {
      rightList.push(key);
    }
  }
  detail.rightList = rightList;
};

seeFetch.config('/temple/verfiy/detail', {
  method: ['post'],
  url: [
    '/application/get',
    '/src/temple/verify/mock/detail',
    '/src/temple/verify/mock/detail',
  ],
  stringify: [!0],
  postHandle: [postHandle, postHandle],
  post: [post, post, post],
});
