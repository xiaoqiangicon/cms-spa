export const refundOrderList = {
  errorCode: 0,
  success: !0,
  total: 99,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    orderTypeStr: '自营',
    fromType: id % 2,
    name: `name ${id}`,
    templeName: `templeName ${id}`,
    num: id * 10,
    price: id * 2,
    wxTransactionId: id,
    payTime: '2020-05-25 14:14:14',
    userName: `username ${id}`,
    mobile: '13212341234',
    isConversionOrder: 1,
    conversionOrderStr: '佛山本焕四转单金额未2',
    disposePicUrl: '',
    isFinish: id % 2,
    isChanzai: 0,
    orderNo: 12341234123,
    type: 2,
    refundMessage: [
      {
        message: '1234',
        addTime: '2020-05-26 14:14:14',
      },
      {
        message: '12',
        addTime: '2020-05-26 14:14:14',
      },
      {
        message: '123',
        addTime: '2020-05-26 14:14:14',
      },
    ],
  })),
};

export const refund = {
  msg: '',
  errorCode: 0,
  data: {},
};
