import seeFetch from 'see-fetch';

const post = res => {
  res.data.list.forEach((item, key) => {
    item.isModify = !1;
    if (item.img) {
      item.images = item.img.split(',');
    } else {
      item.images = [];
    }
    if (item.video) {
      item.videos = item.video.split(',');
    } else {
      item.videos = [];
    }
  });
};

seeFetch.config('sl-business-promo/topicComponentEdit/listSchedule', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/topic/listSchedule',
    '/sl-business-promo/topic_component_edit/mock/get_schedule',
    '/sl-business-promo/topic_component_edit/mock/get_schedule',
  ],
  post: [post, post, post],
});
