import seeFetch from 'see-fetch';

const refactor = {
  data: {
    // isShowWish: 'isShowWish',
    // title: 'title',
    // introduce: 'introduce',
    cover: 'coverPic',
    // templeComponent: 'templeComponent',
    _templeComponent: {
      title: 'templeTitle',
      list: 'templeList',
    },
    buddhistComponent: 'commodityComponent',
    _buddhistComponent: {
      title: 'commodityTitle',
      list: 'commodityList',
    },
    // goodsComponent: 'goodsComponent',
    _goodsComponent: {
      title: 'goodsTitle',
      list: 'goodsList',
    },
  },
};

const post = res => {
  res.data.cover = res.data.cover.split(',');
};

seeFetch.config('promo/topicEdit/getDetail', {
  method: ['post'],
  stringify: [!0, !0],
  url: [
    '/topic/detail',
    '/promo/topic_edit/mock/get_detail',
    '/promo/topic_edit/mock/get_detail',
  ],
  refactor: [refactor, refactor],
  post: [post, post],
});
