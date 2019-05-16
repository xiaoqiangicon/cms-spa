export default {
  errorCode: 0,
  msg: '',
  data: [1, 2, 3, 4, 5, 6].map(id => ({
    id,
    name: `选择项名称${id}`,
    conversionSubdivide: [
      {
        templeId: 11,
        commodityId: 11,
        subdivideId: 11,
        name: '选择项',
        price: 0,
      }
    ],
    isOrder: Math.floor(Math.random() * 2),
    isZizaijiaCommodity: Math.floor(Math.random() * 2),
  })),
};
