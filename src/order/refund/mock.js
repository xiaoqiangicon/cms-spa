export const list = {
  success: !0,
  total: 99,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    fromType: id % 2,
    title: `title ${id}`,
    templeName: `templeName ${id}`,
    amount: id * 10,
    time: '2019-01-01 01:01:01',
  })),
};

export const list1 = {
  errorCode: 0,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    isChanzai: id % 2,
    name: `title ${id}`,
    templeName: `templeName ${id}`,
    price: id * 10,
    payTime: '2019-01-01 01:01:01',
  })),
};
