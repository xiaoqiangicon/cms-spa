import seeFetch from 'see-fetch';

const req = {
  buddhistId: 'commodityId',
};

seeFetch.config('sl-business-promo/topicEdit/getBuddhistData', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/ceremony/getCommodity/',
    '/sl-business-promo/topic_edit/mock/get_buddhist_data',
    '/sl-business-promo/topic_edit/mock/get_buddhist_data',
  ],
  req: [req, req],
});
