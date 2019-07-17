import seeFetch from 'see-fetch';

const req = {
  buddhistId: 'commodityId',
};

seeFetch.config('promo/topicEdit/getBuddhistData', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/ceremony/getCommodity/',
    '/promo/topic_edit/mock/get_buddhist_data',
    '/promo/topic_edit/mock/get_buddhist_data',
  ],
  req: [req, req],
});
