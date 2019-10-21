/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

const refactor = {
  data: [
    {
      fromType: 'isChanzai',
      title: 'name',
      amount: 'price',
      time: 'payTime',
      selectItemName: 'subdivideName',
      count: 'num',
      prayType: 'buddhaWallType',
      placeSequence: 'place',
      flowNo: 'wxTransactionId',
      contactName: 'userName',
      contactPhone: 'mobile',
    },
  ],
};

const post = res => {};

seeFetch.config('/master/project/list', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/order/getRefundOrderList',
    '/master/project/mock/list',
    '/master/project/mock/list',
  ],
  post: [post],
});
