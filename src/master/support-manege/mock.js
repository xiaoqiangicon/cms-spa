const numStrs = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];

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
      type: id % 2 ? 1 : 3,
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

export const getMasterList = {
  msg: 'is ok',
  errorCode: 0,
  data: {
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
      id,
      bonzeName: `禅${numStrs[id - 1]}法师`,
      price: parseFloat((Math.random() * 1000).toFixed(2)),
    })),
  },
};
