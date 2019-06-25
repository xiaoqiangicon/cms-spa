export default {
  errorCode: 0,
  msg: '',
  total: 100,
  data: {
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(topicId => ({
      id: topicId,
      bgColor: 'red',
      btnBgColor: 'green',
      textColor: 'blue',
      title: `专题${topicId}`,
      introduce: '简介',
      url: 'https://www.baidu.com',
      coverPic:
        'https://pic.zizaihome.com/7a41f3b7-76c8-4f8a-b11a-3f29292418c2.jpg',
      isShowWish: Number(Math.floor(Math.random() * 2)),
      status: 0,
      addTime: '2019-01-01 12:12:12',
      templeComponent: {
        templeTitle: '寺院组件标题',
        templeList: [1, 2, 3, 4].map(id => ({
          id,
          name: `寺院组件名${id}`,
        })),
      },
      commodityComponent: {
        commodityTitle: '佛事组件标题',
        commodityList: [1, 2, 3, 4, 5].map(id => ({
          id,
          name: `佛事组件名${id}`,
        })),
      },
      goodsComponent: {
        goodsTitle: '商品组件标题',
        goodsList: [1, 2, 3, 4, 5, 6].map(id => ({
          id,
          name: `佛事组件名${id}`,
          price: 100,
        })),
      },
    })),
  },
};
