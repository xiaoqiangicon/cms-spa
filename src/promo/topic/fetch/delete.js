import seeFetch from 'see-fetch';

const req = {
  // id: 'id',
};

seeFetch.config('promo/topic/delete', {
  method: ['post'],
  stringify: [!0],
  url: ['/topic/del', '/promo/topic/mock/success', '/promo/topic/mock/success'],
  req: [req, req],
});
