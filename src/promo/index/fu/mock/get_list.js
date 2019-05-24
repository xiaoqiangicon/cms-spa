export default {
  errorCode: 0,
  msg: '',
  data: {
    total: 1000,
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
      id,
      name: `佛事${id}`,
      blessCoinSort: id,
      templeName: `寺院${id}`,
      conversionOrderNum: Math.ceil(Math.random() * 1000),
      shareBlessCoinPay: Math.ceil(Math.random() * 1000),
      shareBlessCoin: Math.ceil(Math.random() * 1000),
      type: Math.floor(Math.random() * 2),
      // 跳转转单设置的 必须字段
      subdivide: [
        {
          id: 1,
          conversionSubdivide: Math.floor(Math.random() * 2),
          isConversion: Math.floor(Math.random() * 2),
          isOrder: Math.floor(Math.random() * 2),
          isZizaijiaCommodity: 0,
          name: '选择项需支付',
          price: 0.01,
          shareBlessCoinPercentage: 11,
        },
        {
          id: 2,
          conversionSubdivide: Math.floor(Math.random() * 2),
          isConversion: Math.floor(Math.random() * 2),
          isOrder: Math.floor(Math.random() * 2),
          isZizaijiaCommodity: 0,
          name: '选择项无需支付',
          price: 0,
          shareBlessCoinPercentage: 20,
        },
        {
          id: 3,
          conversionSubdivide: Math.floor(Math.random() * 2),
          isConversion: Math.floor(Math.random() * 2),
          isOrder: Math.floor(Math.random() * 2),
          isZizaijiaCommodity: 0,
          name: '选择项随喜',
          price: -1,
          shareBlessCoinPercentage: 30,
        },
      ],
      isEnd: Math.floor(Math.random() * 2),
      promotionPercentage: Math.ceil(Math.random() * 20),
      // 跳转转单佛事设置 的 必须字段
      isPromotion: Math.floor(Math.random() * 2),
      rate: Math.random(),
      startTime: '2019-02-22 11:22:22',
    })),
  }
};
