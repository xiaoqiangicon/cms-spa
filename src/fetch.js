import seeFetch from 'see-fetch';

seeFetch.setEnv(__SEE_ENV__); // eslint-disable-line no-undef
seeFetch.setEnv(2);

const post = res => {
  res.success = res.result >= 0 || res.errorCode >= 0;
  res.message = res.msg || '未知错误，请稍后重试';
};

seeFetch.config('common', {
  post: [post, post],
});
