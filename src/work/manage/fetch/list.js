import seeFetch from 'see-fetch';

const post = res => {
  if (res.data && res.data.length) {
    res.data.forEach(item => {
      item.percent = item.targetMoney
        ? ((item.payMoney / item.targetMoney) * 100).toFixed(2) + '%'
        : '100%';
    });
  }
};

seeFetch.config('work/manage/getList', {
  method: ['get'],
  stringify: [!0],
  url: [
    '/mk/projectList',
    '/src/work/manage/mock/get_list',
    '/src/work/manage/mock/get_list',
  ],
  postHandle: [post, post, post],
});
