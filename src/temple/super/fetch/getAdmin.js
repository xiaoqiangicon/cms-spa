import seeFetch from 'see-fetch';

const post = res => {
  res.data.adminList.forEach(item => {
    item.areas = item.area ? item.area.split(',') : [];
  });
};

seeFetch.config('temple/super/getAdmin', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/temple/getAdmin',
    '/temple/super/mock/getAdmin',
    '/temple/super/mock/getAdmin',
  ],
  post: [post, post, post],
});
