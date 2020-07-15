import seeFetch from 'see-fetch';

const post = res => {
  res.data.list.forEach(item => {
    item.price = parseFloat(item.price).toFixed(2);
  });
};

seeFetch.config('finance/receipt/list', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/finance/getInvoiceList',
    '/finance/receipt/mock/list',
    '/finance/receipt/mock/list',
  ],
  post: [post, post, post],
});
