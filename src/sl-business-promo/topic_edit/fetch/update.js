import seeFetch from 'see-fetch';

const req = {
  // id: 'id',
  // isShowWish: 'isShowWish',
  // title: 'title',
  // introduce: 'introduce',
  bgColor: 'color1',
  btnBgColor: 'color2',
  textColor: 'color3',
  cover: 'coverPic',
  // componentJson: 'componentJson',
};

const pre = params => ({
  ...params,
  isShowWish: Number(params.isShowWish),
  coverPic: params.coverPic.join(','),
});

seeFetch.config('sl-business-promo/topicEdit/update', {
  method: ['post'],
  stringify: [!0, !0],
  url: [
    '/topic/edit',
    '/sl-business-promo/topic_edit/mock/success',
    '/sl-business-promo/topic_edit/mock/success',
  ],
  req: [req, req],
  pre: [pre, pre],
});
