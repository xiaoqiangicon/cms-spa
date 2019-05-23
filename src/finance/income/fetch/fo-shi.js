import seeFetch from 'see-fetch';

const preHandle = req => {
  req.status = 0;
  req.isTest = 1;
  req.isFinish = 0;
  req.pageNumber = 0;
  req.pageSize = 10000;
};

const responseRefactor = {
  data: 'data.list',
  _data: [
    {
      promoteRate: 'promotionPercentage',
      promoteAmount: 'promotionMoney',
      serviceRate: 'serviceMoney',
    },
  ],
};

seeFetch.config('finance/income/foShi', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/ceremony/list',
    '/finance/income/mock/foShi1',
    '/finance/income/mock/foShi',
  ],
  responseRefactor: [responseRefactor, responseRefactor],
  preHandle: [preHandle, preHandle],
});
