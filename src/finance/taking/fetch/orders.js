/* eslint-disable no-param-reassign, prefer-destructuring, no-nested-ternary */
import seeFetch from 'see-fetch';
import { makeTotal } from '../util';

const req = {
  id: 'pickUpId',
};

const refactor = {
  data: [
    {
      time: 'add_time',
      templeName: 'temple_name',
      isQuestion: 'is_question',
      amount: 'price',
      gotReceipt: 'is_express_receipt',
      extra: 'remarks',
      feedbackImages: 'picList',
      receiptImages: 'feedBackPicList',
    },
  ],
};

const post = res => {
  if (res.data && res.data.dateItems) {
    makeTotal(res.data);
  }
};

const postLocal = res => {
  makeTotal(res.data);
};

seeFetch.config('finance/taking/orders', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/finance/getPickUpDetails',
    '/finance/taking/mock/orders1',
    '/finance/taking/mock/orders',
  ],
  req: [req, req],
  refactor: [refactor, refactor],
  post: [post, post, postLocal],
});
