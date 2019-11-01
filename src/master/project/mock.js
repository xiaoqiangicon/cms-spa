export const list = {
  success: !0,
  total: 99,
  result: 1,
  data: {
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
      id,
      name: `title ${id}`,
      amount: id * 10,
      price: id,
      addTime: '2019-01-01 01:01:01',
      url: 'www.baidu.com',
      detail: '<p><strong>测试</strong></p>',
      payBtn: '测试',
      isShowJoinList: 0,
      pic:
        'https://pic.zizaihome.com/7c147df2-df39-11e9-8a1a-00163e060b31.png, https://pic.zizaihome.com/5f03f700-faf6-11e9-bed5-00163e060b31.png',
    })),
  },
};

export const del = {
  success: !0,
  result: 1,
};
