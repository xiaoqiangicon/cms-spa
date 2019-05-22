export default {
  errorCode: 0,
  msg: '',
  pageNumber: -1,
  count: 100,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    name: `测试机随缘寺院转单测试${id}`,
    conversionOrderNum: 1,
    conversionOrderPrice: 0,
    orderNum: 1,
    profitConversionOrderPrice: 0.03,
    subdivide: [
      {
        id: 1,
        conversionSubdivide: Math.floor(Math.random() * 2),
        isConversion: Math.floor(Math.random() * 2),
        isOrder: Math.floor(Math.random() * 2),
        isZizaijiaCommodity: 0,
        name: '选择项需支付',
        price: 0.01,
      },
      {
        id: 2,
        conversionSubdivide: Math.floor(Math.random() * 2),
        isConversion: Math.floor(Math.random() * 2),
        isOrder: Math.floor(Math.random() * 2),
        isZizaijiaCommodity: 0,
        name: '选择项无需支付',
        price: 0,
      },
      {
        id: 3,
        conversionSubdivide: Math.floor(Math.random() * 2),
        isConversion: Math.floor(Math.random() * 2),
        isOrder: Math.floor(Math.random() * 2),
        isZizaijiaCommodity: 0,
        name: '选择项随喜',
        price: -1,
      },
    ],
    templeList: ['寺院1', '寺院2'],
    time: '2017-12-21 19:12:36',
    isEnd: Math.floor(Math.random()*2),
    isShareBlessCoin: Math.floor(Math.random()*2),
  })),
};
