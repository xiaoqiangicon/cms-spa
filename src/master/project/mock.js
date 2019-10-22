export const list = {
  success: !0,
  total: 99,
  result: 1,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    name: `title ${id}`,
    amount: id * 10,
    price: id,
    addTime: '2019-01-01 01:01:01',
    url: 'www.baidu.com',
  })),
};

export const del = {
  success: !0,
  result: 1,
};
