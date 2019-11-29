import seeFetch from 'see-fetch';

seeFetch.config('master/support/getOrderRecordList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/wish/getBonzeOrderRecordList',
    '/master/support-manage/fetch/mock/getOrderRecordList1',
    '/master/support-manage/fetch/mock/getOrderRecordList',
  ],
});
