export const list = {
  success: !0,
  totalCount: 99,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    takeId: id,
    time: '2019-01-01 01:01:01',
    templeName: `templeName ${id}`,
    typeName: `typeName ${id}`,
    timeRegion: '2019-01-01 ~ 2019-01-01',
    amount: id * 10,
    // 1: 表示提现中，0：表示未在提现中
    handling: id % 2,
  })),
};

export const list1 = {
  errorCode: 0,
  pageSum: 9,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    pickUpId: id,
    addTime: '2019-01-01 01:01:01',
    templeName: `templeName ${id}`,
    commodityName: `typeName ${id}`,
    timeStr: '2019-01-01 ~ 2019-01-01',
    price: id * 10,
    isCashWithdrawal: id % 2,
  })),
};

export const temples = {
  success: !0,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    name: `temple-${id}`,
  })),
};

export const temples1 = {
  errorCode: 0,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    temple_name: `temple-${id}`,
  })),
};

export const types = {
  success: !0,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    name: `temple-${id}`,
    children: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(subId => ({
      id: id * 100 + subId,
      name: `temple-${id}-${subId}`,
    })),
  })),
};

export const types1 = {
  errorCode: 0,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    type: id,
    name: `temple-${id}`,
    subList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(subId => ({
      id: id * 100 + subId,
      name: `temple-${id}-${subId}`,
    })),
  })),
};

export const add = { success: !0 };
export const add1 = { errorCode: 0 };
export const del = { success: !0 };
export const del1 = { errorCode: 0 };
