import seeFetch from 'see-fetch';

seeFetch.config('promo/wx_menu/syncMenu', {
  method: ['post'],
  stringify: [!0],
  url: ['/wx/syncMenu', '/promo/wx_menu/mock/sync', '/promo/wx_menu/mock/sync'],
});
