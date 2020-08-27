import seeFetch from 'see-fetch';

const req = {
  // id: 'id',
};

seeFetch.config('sl-business-promo/topic/delete', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/topic/del',
    '/sl-business-promo/topic/mock/success',
    '/sl-business-promo/topic/mock/success',
  ],
  req: [req, req],
});
