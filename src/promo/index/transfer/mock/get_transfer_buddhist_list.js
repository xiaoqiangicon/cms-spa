export default {
  errorCode: 0,
  msg: '',
  pageNumber: -1,
  count: 100,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    name: '测试机随缘寺院转单测试',
    conversionOrderNum: 1,
    conversionOrderPrice: 0,
    orderNum: 1,
    profitConversionOrderPrice: 0.03,
    subdivide: [
      {
        id: 12,
        conversionSubdivide: Math.floor(Math.random() * 2),
        isConversion: Math.floor(Math.random() * 2),
        isOrder: Math.floor(Math.random() * 2),
        isZizaijiaCommodity: 0,
        name: '测试有规格',
        price: 0.01,
      },
    ],
    templeList: ['寺院1', '寺院2'],
    time: '2017-12-21 19:12:36',
  })),
};
