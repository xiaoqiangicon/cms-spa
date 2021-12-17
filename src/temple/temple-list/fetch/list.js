import seeFetch from 'see-fetch';

let statusText = ['审核通过', '未审核', '未通过'];
let postText = ['未邮寄', '已邮寄'];

const post = res => {
  if (res.data && res.data.length) {
    res.data.forEach(item => {
      item.verify = '' + item.verify;
    });
  }
};

seeFetch.config('/temple/list/list', {
  method: ['post'],
  url: [
    '/temple/pageList',
    '/temple/temple-list/mock/list',
    '/temple/temple-list/mock/list',
  ],
  stringify: [!0],
  post: [post, post, post],
});
