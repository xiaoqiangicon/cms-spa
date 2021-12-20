import seeFetch from 'see-fetch';

const post = res => {
  res.data.forEach(item => {
    let rightList = [];
    for (key in item) {
      if (key.indexOf('pw_') > -1 && item[key]) {
        rightList.push(key);
      }
    }
    item.rightList = rightList;
  });
};

seeFetch.config('/temple/list/userList', {
  method: ['post'],
  url: [
    '/temple/userList',
    '/temple/temple-list/mock/userList',
    '/temple/temple-list/mock/userList',
  ],
  stringify: [!0],
  post: [post, post, post],
});
