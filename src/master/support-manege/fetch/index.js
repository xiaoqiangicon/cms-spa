import seeFetch from 'see-fetch';

seeFetch.config('master/support/getOrderRecordList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/wish/getBonzeOrderRecordList',
    '/master/support-manege/mock/getOrderRecordList',
    '/master/support-manege/mock/getOrderRecordList',
  ],
});

seeFetch.config('master/support/getMasterList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/wish/getAllBonze',
    '/master/support-manege/mock/getMasterList',
    '/master/support-manege/mock/getMasterList',
  ],
});
