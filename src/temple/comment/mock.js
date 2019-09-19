export const get_list = {
  data: {
    dataList: [
      {
        id: 1,
        evaluation: 1,
        content: '挺不错的',
        reply: '测试',
        addTime: '2019008-24 15-56-52',
        labelRecordList: ['处理及时', '超越期望'],
        nickName: '*子',
        userId: 1000013,
        mobile: '1234234',
        templeName: '佛山本焕寺',
        commodityName: '附言心愿非必填',
        subdivideName: '普通佛事',
      },
      {
        id: 2,
        evaluation: 2,
        content: '挺不错的',
        reply: '测试',
        addTime: '2019008-24 15-56-52',
        labelRecordList: ['处理及时1', '超越期望1'],
        nickName: '*子',
        userId: 10000134,
        mobile: '1234234',
        templeName: '佛山本焕寺1',
        commodityName: '附言心愿非必填1',
        subdivideName: '普通佛事1',
      },
    ],
  },
  total: 128,
  result: 0,
  msg: '成功',
};

export const get_temple_list = {
  msg: '成功',
  result: 0,
  data: [
    {
      templeId: 1,
      templeName: '弘法寺',
    },
    {
      templeId: 2,
      templeName: '本焕寺',
    },
    {
      templeId: 11,
      templeName: '凌风寺院',
    },
  ],
};

export const del_evaluation = {
  msg: '成功',
  result: 1,
};
