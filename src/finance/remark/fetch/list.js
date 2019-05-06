import seeFetch from 'see-fetch';

const responseRefactor = {
  data: [
    {
      key: 'id',
      content: 'title',
      editUser: 'managerName',
      publishTime: 'addTime',
      takeEffect: 'status',
    },
  ],
};

/* eslint-disable no-param-reassign */
const postHandle = res => {
  res.totalCount = 1;
};

seeFetch.config('finance/remark/list', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/cashMemo/list',
    '/finance/remark/mock/list1',
    '/finance/remark/mock/list',
  ],
  responseRefactor: [responseRefactor, responseRefactor],
  postHandle: [postHandle, postHandle],
});
