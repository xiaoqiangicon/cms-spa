import seeFetch from 'see-fetch';

const post = res => {
  if (res.data && res.data.length) {
    res.data.forEach(item => {
      item.typeText =
        item.type === 1 ? '对公账户' : item.type === 2 ? '个人账户' : '';
      item.statusText =
        item.status === 0
          ? '未审核'
          : item.status === 1
          ? '已审核通过'
          : item.status === 2
          ? '已审核未通过'
          : '';
    });
  }
};

seeFetch.config('/temple/financeVerify/getList', {
  method: ['post'],
  url: [
    '/finance/getTempleBankList',
    '/src/temple/finance-verify/mock/list',
    '/src/temple/finance-verify/mock/list',
  ],
  stringify: [!0],
  post: [post, post, post],
});
