/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';
import '../../../com/refactor/default-string';

const req = {
  page: 'pageNum',
  handled: 'status',
  exchange: 'type',
};

const pre = params => ({
  ...params,
  pageNum: params.pageNum - 1,
  pageSize: 10,
});

const refactor = {
  totalCount: 'data.count',
  data: 'data.list',
  _data: [
    {
      title: 'giftName',
      nickname: 'nickName',
      exchangeTime: 'addTime',
      expressType: 'isReal',
      name: 'name|default-string!-',
      address: 'address|default-string!-',
      phone: 'tel|default-string!-',
      expressCompany: 'deliveryCompany|default-string!-',
      expressOrder: 'deliveryNumber|default-string!-',
    },
  ],
};

const post = res => {
  if (res.data)
    res.data.forEach(item => {
      item.cover = item.giftPic.split(',')[0];
    });
};

seeFetch.config('ling/exchange/list', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/wish/getWishGiftProcessList',
    '/ling/exchange/mock/list1',
    '/ling/exchange/mock/list',
  ],
  req: [req, req],
  pre: [pre, pre],
  refactor: [refactor, refactor],
  post: [post, post],
});
