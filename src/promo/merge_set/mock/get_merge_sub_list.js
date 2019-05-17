export default {
  errorCode: 0,
  msg: '',
  data: [1, 2, 3, 4, 5, 6].map(id => ({
    id,
    name: `选择项名称${id}`,
    conversionSubdivide: [
      {
        templeId: 1,
        commodityId: 1,
        subdivideId: 1,
        name: '选择项1',
        price: 1,
      },
      {
        templeId: 2,
        commodityId: 2,
        subdivideId: 2,
        name: '选择项2',
        price: 2,
      }
    ],
    isOrder: Math.floor(Math.random() * 2),
    isZizaijiaCommodity: Math.floor(Math.random() * 2),
  })),
};
