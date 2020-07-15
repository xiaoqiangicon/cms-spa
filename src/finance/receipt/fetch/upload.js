import seeFetch from 'see-fetch';

seeFetch.config('finance/receipt/upload', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/finance/uploadInvoice',
    '/finance/receipt/mock/uploadInvoice',
    '/finance/receipt/mock/uploadInvoice',
  ],
});
