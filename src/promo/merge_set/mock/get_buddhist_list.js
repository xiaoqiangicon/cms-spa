export default {
  errorCode: 0,
  msg: '',
  data: [1, 2, 3, 4, 5, 6].map(id => ({
    id,
    name: `佛事名称${id}`,
    subdivides: [
      {
        id: 11,
        subdivideName: '选择项',
        conversionSubdivide: 0,
        isConversion: 0,
        isOrder: 0,
        isZizaijiaCommodity: 0,
        price: 10,
      }
    ],
  })),
};
