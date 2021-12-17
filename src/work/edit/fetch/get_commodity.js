import seeFetch from 'see-fetch';

const post = res => {
  if (res.data) {
    res.data.label = res.data.id + ' - ' + res.data.name;
  }
};

seeFetch.config('work/edit/getCommodity', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/ceremony/getCommoditySimpleInfo',
    '/src/work/edit/mock/getCommodity',
    '/src/work/edit/mock/getCommodity',
  ],
  postHandle: [post, post, post],
});
