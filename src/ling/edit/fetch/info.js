/* eslint-disable no-param-reassign */
import seeFetch from 'see-fetch';

const refactor = {
  data: {
    expressType: 'isReal',
    exchangePrice: 'coin',
    remainCount: 'stock',
    priority: 'sort',
    exchangeTip: 'prompt',
    detail: 'content',
    desc: 'illustrate',
    phoneAmount: 'telMoney',
  },
};

const post = res => {
  res.data.covers = res.data.pic.split(',');
};

seeFetch.config('ling/edit/info', {
  method: ['post'],
  stringify: [!0],
  url: ['', '/ling/edit/mock/info1', '/ling/edit/mock/info'],
  refactor: [refactor, refactor],
  post: [post, post],
  implement: [
    () =>
      new Promise(resolve => {
        const item = window.sessionStorage['ling/edit/item'];

        if (!item) {
          resolve({
            errorCode: 0,
            msg: '请勿重复编辑此页',
          });
        } else {
          resolve({
            errorCode: 0,
            data: JSON.parse(item),
          });
        }
      }),
  ],
});
