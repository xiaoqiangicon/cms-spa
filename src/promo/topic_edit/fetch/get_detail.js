import seeFetch from 'see-fetch';

const refactor = {
  data: {
    isShowWish: 'isShowWish|bool',
    // title: 'title',
    // introduce: 'introduce',
    cover: 'coverPic',
    bgColor: 'color1',
    btnBgColor: 'color2',
    textColor: 'color3',
    // templeComponent: 'templeComponent',
    _templeComponent: {
      title: 'templeTitle',
      // list: 'list',
    },
    buddhistComponent: 'commodityComponent',
    _buddhistComponent: {
      title: 'commodityTitle',
      // list: 'list',
    },
    // goodsComponent: 'goodsComponent',
    _goodsComponent: {
      title: 'goodsTitle',
      _list: [
        {
          priceStr: 'price',
        },
      ],
    },
  },
};

const post = res => {
  res.data.cover = res.data.cover.split(',');
  res.data.icon = res.data.icon.split(',');
  // 添加默认字段
  if (!res.data.templeComponent)
    res.data.templeComponent = { title: '', list: [] };

  if (!res.data.buddhistComponent)
    res.data.buddhistComponent = { title: '', list: [] };

  if (!res.data.goodsComponent)
    res.data.goodsComponent = { title: '', list: [] };
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
