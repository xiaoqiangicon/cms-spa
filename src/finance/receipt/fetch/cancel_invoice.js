import seeFetch from 'see-fetch';

seeFetch.config('finance/receipt/cancelInvoice', {
  method: ['post'],
  url: [
    '/finance/cancelInvoice',
    '/finance/receipt/mock/cancelInvoice',
    '/finance/receipt/mock/cancelInvoice',
  ],
});
