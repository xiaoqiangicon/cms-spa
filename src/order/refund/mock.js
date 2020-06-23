export const list = {
  success: !0,
  total: 99,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    fromType: id % 2,
    title: `title ${id}`,
    templeName: `templeName ${id}`,
    amount: id * 10,
    disposePicUrl:
      'https://pic.zizaihome.com/fa354df6-b1a8-11e9-b5f9-00163e0c1e1c.png,https://pic.zizaihome.com/fa354df6-b1a8-11e9-b5f9-00163e0c1e1c.png',
    time: '2019-01-01 01:01:01',
    posiscript: [],
  })),
};

export const list1 = {
  errorCode: 0,
  total: 33,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    isChanzai: id % 2,
    name: `title ${id}`,
    templeName: `templeName ${id}`,
    price: id * 10,
    disposePicUrl:
      'https://pic.zizaihome.com/fa354df6-b1a8-11e9-b5f9-00163e0c1e1c.png,https://pic.zizaihome.com/fa354df6-b1a8-11e9-b5f9-00163e0c1e1c.png',
    payTime: '2019-01-01 01:01:01',
    posiscript: [],
  })),
};

export const refundOrderList = {
  errorCode: 0,
  success: !0,
  total: 99,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
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
    disposePicUrl:
      id > 2
        ? 'https://pic.zizaihome.com/fa354df6-b1a8-11e9-b5f9-00163e0c1e1c.png,https://pic.zizaihome.com/fa354df6-b1a8-11e9-b5f9-00163e0c1e1c.png'
        : '',
    isFinish: 0,
    isChanzai: 0,
    orderNo: 12341234123,
    type: 2,
    posiscript: [],
    refundMessage: [
      {
        message: '',
        addTime: '2020-05-26 14:14:14',
      },
    ],
  })),
};

export const refund = {
  msg: '',
  errorCode: 0,
  data: '',
};
