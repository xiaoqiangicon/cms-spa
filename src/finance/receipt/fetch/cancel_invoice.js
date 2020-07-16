import seeFetch from 'see-fetch';

seeFetch.config('finance/receipt/cancelInvoice', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/finance/cancelInvoice',
    '/finance/receipt/mock/cancelInvoice',
    '/finance/receipt/mock/cancelInvoice',
  ],
});
