import seeFetch from 'see-fetch';

const post = res => {
  if (res.data && res.data.length) {
    res.data.forEach(item => {
      item.label = item.name + `(项目负责人：${item.managerName})`;
    });
  }
};

seeFetch.config('work/edit/getList', {
  method: ['get'],
  stringify: [!0],
  url: [
    '/mk/projectList',
    '/src/work/manage/mock/get_list',
    '/src/work/manage/mock/get_list',
  ],
  postHandle: [post, post, post],
});
