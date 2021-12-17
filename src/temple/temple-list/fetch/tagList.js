import seeFetch from 'see-fetch';

const post = res => {
  if (res.data && res.data.length) {
    res.data.forEach(item => {});
  }
};

seeFetch.config('/temple/list/tagList', {
  method: ['post'],
  url: [
    '/tag/list',
    '/temple/temple-list/mock/tagList',
    '/temple/temple-list/mock/tagList',
  ],
  stringify: [!0],
  post: [post, post, post],
});
