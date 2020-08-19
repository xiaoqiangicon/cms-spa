import seeFetch from 'see-fetch';

const req = {
  buddhistId: 'commodityId',
};

const post = res => {
  res.data.forEach(item => {
    item.name = `${item.id}-${item.name}`;
  });
  console.log('hello', res.data);
};

seeFetch.config('sl-business-promo/topicComponentEdit/getBuddhistData', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/ceremony/namelist',
    '/sl-business-promo/topic_component_edit/mock/get_buddhist_data',
    '/sl-business-promo/topic_component_edit/mock/get_buddhist_data',
  ],
  req: [req, req],
  post: [post, post, post],
});
