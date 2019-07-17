import seeFetch from 'see-fetch';

const req = {
  buddhistId: 'commodityId',
};

const post = res => {
  if (!res.data) {
    res.data = { name: '' };
  }
};

seeFetch.config('promo/topicEdit/getBuddhistName', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/ceremony/getCommodity/',
    '/promo/topic_edit/mock/get_buddhist_name',
    '/promo/topic_edit/mock/get_buddhist_name',
  ],
  req: [req, req],
  post: [post, post],
});
