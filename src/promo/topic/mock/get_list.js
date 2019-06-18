export default {
  errorCode: 0,
  msg: '',
  total: 100,
  data: {
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
      id,
      title: `专题${id}`,
      introduce: '简介',
      url: 'https://www.baidu.com',
      coverPic:
        'https://pic.zizaihome.com/7a41f3b7-76c8-4f8a-b11a-3f29292418c2.jpg',
      isShowWish: Number(Math.floor(Math.random() * 2)),
      status: 0,
      addTime: '2019-01-01 12:12:12',
    })),
  },
};
