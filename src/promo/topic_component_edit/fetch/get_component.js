import seeFetch from 'see-fetch';

seeFetch.config('promo/topicComponentEdit/getComponent', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/topic/getComponentAndTag',
    '/promo/topic_component_edit/mock/get_component',
    '/promo/topic_component_edit/mock/get_component',
  ],
});
