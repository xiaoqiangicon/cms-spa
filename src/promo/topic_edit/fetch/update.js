import seeFetch from 'see-fetch';

const req = {
  // id: 'id',
  // isShowWish: 'isShowWish',
  // title: 'title',
  // introduce: 'introduce',
  cover: 'coverPic',
  // templeComponent: 'templeComponent',
  // _templeComponent: {
  //   title: 'templeTitle',
  //   list: 'templeList',
  // },
  buddhistComponent: 'commodityComponent',
  // _buddhistComponent: {
  //   title: 'commodityTitle',
  //   list: 'commodityList',
  // },
  // goodsComponent: 'goodsComponent',
  // _goodsComponent: {
  //   title: 'goodsTitle',
  //   list: 'goodsList',
  // },
};

const pre = params => ({
  ...params,
  templeComponent: {
    templeTitle: params.templeComponent.title,
    templeList: params.templeComponent.list,
  },
  commodityComponent: {
    commodityTitle: params.commodityComponent.title,
    commodityList: params.commodityComponent.list,
  },
  goodsComponent: {
    goodsTitle: params.goodsComponent.title,
    goodsList: params.goodsComponent.list,
  },
  coverPic: params.coverPic.join(','),
});

seeFetch.config('promo/topicEdit/update', {
  method: ['post'],
  stringify: [!0, !0],
  url: [
    '/topic/edit',
    '/promo/topic_edit/mock/success',
    '/promo/topic_edit/mock/success',
  ],
  req: [req, req],
  pre: [pre, pre],
});
