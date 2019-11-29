export const getOrderRecordList = {
  msg: 'is ok',
  errorCode: 0,
  data: {
    total: 38,
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
      id,
      bonzeId: id * 10,
      bonzeUserId: id * 100000,
      price: parseFloat((Math.random() * 1000).toFixed(2)),
      type: id % 2 ? 1 : 2,
      contentId: id * 100,
      isPickUp: 0,
      pickUpId: 0,
      pickUpTime: '2019-11-21 17:07:40',
      addTime: '2019-11-21 17:07:39',
      updateTime: '2019-11-21 17:07:40',
      wxTransactionId: '4200000447201911214621774545',
    })),
  },
};
export const getOrderRecordList1 = {
  msg: 'is ok1',
  errorCode: 0,
  data: {
    total: 38,
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
      id,
      bonzeId: id * 10,
      bonzeUserId: id * 100000,
      price: parseFloat((Math.random() * 1000).toFixed(2)),
      type: id % 2 ? 1 : 2,
      contentId: id * 100,
      isPickUp: 0,
      pickUpId: 0,
      pickUpTime: '2019-11-21 17:07:40',
      addTime: '2019-11-21 17:07:39',
      updateTime: '2019-11-21 17:07:40',
      wxTransactionId: '4200000447201911214621774545',
    })),
  },
};

export const temples = {
  success: true,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    key: id,
    name: `寺院名 ${id}`,
  })),
};
export const temples1 = {
  result: 0,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    key: id,
    name: `寺院名 ${id}`,
  })),
};
