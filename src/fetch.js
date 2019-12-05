import { Notification } from 'element-ui';
import seeFetch from 'see-fetch';

seeFetch.setEnv(__SEE_ENV__); // eslint-disable-line no-undef
// seeFetch.setEnv(2);

const post = res => {
  res.success = res.result >= 0 || res.errorCode >= 0;
  res.message = res.msg || '未知错误，请稍后重试';

  if (res.error) {
    Notification({
      title: '提示',
      message: `接口错误，请联系自在家开发人员：url[${res.response.url}], status[${res.response.status}], statusText[${res.response.statusText}]`,
      duration: 0,
    });
  }
};

seeFetch.config('common', {
  post: [post, post],
});
