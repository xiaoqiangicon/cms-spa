import seeFetch from 'see-fetch';

const post = res => {
  res.data &&
    res.data.forEach(item => {
      if (item.status.indexOf('在线') !== -1) {
        item.online = !0;
      } else {
        item.online = !1;
      }
    });
};

seeFetch.config('promo/transfer_set/getPrinterList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/conversionOrder/printerList',
    '/promo/transfer_set/mock/get_printer_list',
    '/promo/transfer_set/mock/get_printer_list',
  ],
  post: [post, post, post],
});
