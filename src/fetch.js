import { Notification } from 'element-ui';
import seeFetch from 'see-fetch';

seeFetch.setEnv(__SEE_ENV__); // eslint-disable-line no-undef
// seeFetch.setEnv(2);

const post = res => {
  res.success = res.result >= 0 || res.errorCode >= 0;
  res.message = res.msg || '未知错误，请稍后重试';

  if (res.error) {
    const urlOrigin = res.response.url
      .split('?')[0]
      .split('#')[0]
      .replace('http://', '')
      .replace('https://', '');
    const urlPath = urlOrigin.slice(urlOrigin.indexOf('/'));
    Notification({
      title: '提示',
      message: `接口错误，请联系SAAS开发人员：url[${urlPath}], status[${res.response.status}], statusText[${res.response.statusText}]`,
      duration: 0,
    });
  }
};

seeFetch.config('common', {
  post: [post, post],
});

function globalAccessPost(res) {
  res.data.names = res.data.menu.map(i => i.key);
}

seeFetch.config('global/access', {
  url: ['/user/menu', '/mock/access-s.json', '/mock/access.json'],
  method: ['post'],
  stringify: [true],
  post: [globalAccessPost, globalAccessPost],
});
