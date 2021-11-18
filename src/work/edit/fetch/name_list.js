import seeFetch from 'see-fetch';

const post = res => {
  res.data.forEach(item => {
    item.label = item.id + '-' + item.name;
    item.contentId = item.id;
  });
};

seeFetch.config('work/edit/nameList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/ceremony/namelist',
    '/src/work/edit/mock/nameList',
    '/src/work/edit/mock/nameList',
  ],
  post: [post, post, post],
});
