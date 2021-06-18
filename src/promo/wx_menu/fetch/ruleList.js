import seeFetch from 'see-fetch';

seeFetch.config('promo/wx_menu/ruleList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/oprule/list',
    '/promo/wx_menu/mock/ruleList',
    '/promo/wx_menu/mock/ruleList',
  ],
});
