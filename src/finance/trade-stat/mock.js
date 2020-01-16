export const faShiList = {
  success: true,
  totalCount: 99,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    key: id,
    orderNum: `${id}${id}${id}${id}${id}`,
    wx_openid: `${id}${id}${id}${id}${id}`,
    userName: `用户名 ${id}`,
    amount: parseFloat((Math.random() * 1000).toFixed(2)),
    createdAt: '2016-07-01 12:12:12',
  })),
};

export const faShiList1 = {
  errorCode: 0,
  data: {
    count: 99,
    array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
      sign: `${id}${id}${id}${id}${id}`,
      wxOpenid: `${id}${id}${id}${id}${id}`,
      name: `用户名 ${id}`,
      money: parseFloat((Math.random() * 1000).toFixed(2)),
      addTime: '2016-07-01 12:12:12',
    })),
  },
};

export const fenXiaoList = {
  success: true,
  totalCount: 99,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    key: id,
    orderNum: `${id}${id}${id}${id}${id}`,
    wx_openid: `${id}${id}${id}${id}${id}`,
    userName: `用户名 ${id}`,
    amount: parseFloat((Math.random() * 1000).toFixed(2)),
    createdAt: '2016-07-01 12:12:12',
  })),
};

export const fenXiaoList1 = {
  errorCode: 0,
  data: {
    count: 99,
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
      orderNo: `${id}${id}${id}${id}${id}`,
      wxOpenId: `${id}${id}${id}${id}${id}`,
      name: `用户名 ${id}`,
      money: parseFloat((Math.random() * 1000).toFixed(2)),
      addTime: '2016-07-01 12:12:12',
    })),
  },
};

export const xinZhongList = {
  success: true,
  totalCount: 99,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    key: id,
    shopNum: `${id}${id}${id}${id}${id}`,
    amount: parseFloat((Math.random() * 1000).toFixed(2)),
    createdAt: '2016-07-01 12:12:12',
  })),
};
export const xinZhongList1 = {
  errorCode: 0,
  data: {
    count: 99,
    array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
      orderNo: `${id}${id}${id}${id}${id}`,
      money: parseFloat((Math.random() * 1000).toFixed(2)),
      addTime: '2016-07-01 12:12:12',
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
