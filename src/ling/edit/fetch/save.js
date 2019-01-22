/* eslint-disable no-param-reassign */
import seeFetch from 'see-fetch';

const req = {
  covers: 'pic',
  expressType: 'isReal',
  exchangePrice: 'coin',
  remainCount: 'stock',
  priority: 'sort',
  exchangeTip: 'prompt',
  detail: 'content',
  desc: 'illustrate',
  phoneAmount: 'telMoney',
};

seeFetch.config('ling/edit/save', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/wish/addOrUpdateWishGift',
    '/ling/edit/mock/save1',
    '/ling/edit/mock/save',
  ],
  req: [req, req],
});
