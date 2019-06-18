import seeFetch from 'see-fetch';

const req = {
  // templeId: 'templeId',
};

const refactor = {
  data: [
    {
      id: 'id',
      avatar: 'headImg',
      // isManager: 'isManager',
      nickname: 'nickName',
    },
  ],
};

seeFetch.config('promo/statistics/getManageList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/conversionOrder/getManageUserList',
    '/promo/statistics/mock/get_manager_list',
    '/promo/statistics/mock/get_manager_list',
  ],
  req: [req, req],
  refactor: [refactor, refactor],
});
