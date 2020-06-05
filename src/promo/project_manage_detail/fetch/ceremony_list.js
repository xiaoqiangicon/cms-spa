import seeFetch from 'see-fetch';

const post = res => {
  if (res.data.length) {
    res.data.forEach((item, key) => {
      item.label = `${item.id}-${item.name}`;
    });
    console.log(res.data);
  }
};

seeFetch.config('promo/projectManageDetail/ceremonyList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/ceremony/namelist',
    '/promo/project_manage_detail/mock/ceremonyList',
    '/promo/project_manage_detail/mock/ceremonyList',
  ],
  post: [post, post, post],
});
