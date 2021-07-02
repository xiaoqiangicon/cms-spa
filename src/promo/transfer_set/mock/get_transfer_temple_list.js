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
        price: 1,
        percent: 2,
        reviewConversion: 1,
        printerType: 1,
        continuousPrintNum: 1,
        isPrintMobile: 0,
        printerId: 2,
        fontType: 0,
        qrcodePrint: 1,
        sealType: 2,
        sealTypeBottom: 3,
      },
    ],
  })),
};
