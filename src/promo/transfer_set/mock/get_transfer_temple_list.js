export default {
  errorCode: 0,
  msg: '',
  data: [1, 2, 3, 4, 5, 6].map(id => ({
    templeId: id,
    templeName: `转单寺院名称${id}`,
    subdivide: [
      {
        subdivideId: 1231,
        subdivideName: '选择项',
        commodityId: 11,
        price: 11,
        percent: 2,
      }
    ]
  })),
};
