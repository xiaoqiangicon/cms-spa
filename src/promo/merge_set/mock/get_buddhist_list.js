export default {
  errorCode: 0,
  msg: '',
  data: [1, 2, 3, 4, 5, 6].map(id => ({
    id,
    name: `佛事名称${id}`,
    subdivides: [
      {
        id: 1,
        subdivideName: '选择项1',
        conversionSubdivide: 0,
        isConversion: 0,
        isOrder: 0,
        isZizaijiaCommodity: 0,
        price: 10,
      },
      {
        id: 2,
        subdivideName: '选择项2',
        conversionSubdivide: 0,
        isConversion: 0,
        isOrder: 0,
        isZizaijiaCommodity: 0,
        price: 10,
      },
      {
        id: 3,
        subdivideName: '选择项3',
        conversionSubdivide: 0,
        isConversion: 0,
        isOrder: 0,
        isZizaijiaCommodity: 0,
        price: 10,
      },
      {
        id: 4,
        subdivideName: '选择项4',
        conversionSubdivide: 0,
        isConversion: 0,
        isOrder: 0,
        isZizaijiaCommodity: 0,
        price: 10,
      }
    ],
  })),
};
