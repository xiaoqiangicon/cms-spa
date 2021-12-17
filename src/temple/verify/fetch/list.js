import seeFetch from 'see-fetch';

let statusText = ['审核通过', '未审核', '未通过'];
let postText = ['未邮寄', '已邮寄'];

const post = res => {
  if (res.data && res.data.list && res.data.list.length) {
    res.data.list.forEach(item => {
      item.statusText = statusText[item.status];
      item.district = item.province + item.city;
      item.postText = postText[item.sendData];
    });
  }
};

seeFetch.config('temple/verify/list', {
  method: ['post'],
  url: [
    '/application/pageList',
    '/temple/verify/mock/list',
    '/temple/verify/mock/list',
  ],
  stringify: [!0],
  post: [post, post, post],
});
