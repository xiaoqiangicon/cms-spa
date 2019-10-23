export default {
  errorCode: 0,
  msg: '',
  data: [1, 2, 3, 4, 5, 6].map(id => ({
    templeId: id,
    templeName: `转单寺院名称${id}`,
    subdivide: [
      {
        subdivideId: 1,
        subdivideName: '选择项1',
        commodityId: 11,
        price: 0,
        percent: 2,
        fuBiRate: 11,
        reviewConversion: 1,
      },
      {
        subdivideId: 2,
        subdivideName: '选择项2',
        commodityId: 11,
        price: 0,
        percent: 2,
        fuBiRate: 11,
        reviewConversion: 1,
      },
    ],
  })),
};
