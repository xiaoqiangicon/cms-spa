/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

const req = {
  date: 'giftDate',
};

const pre = params => {
  if (params.type === 2) {
    params.telMoney = 0;
    params.cash = params.amount;
  } else {
    params.telMoney = params.amount;
    params.cash = 0;
  }

  delete params.type;
  delete params.amount;
};

seeFetch.config('ling/gift/update', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/wish/addOrUpdateRichGift',
    '/ling/gift/mock/update1',
    '/ling/gift/mock/update',
  ],
  req: [req, req],
  pre: [pre, pre],
});
