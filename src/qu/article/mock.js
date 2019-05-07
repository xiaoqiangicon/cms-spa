export const list = {
  success: true,
  totalCount: 99,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    cover: `/sample/image${Math.floor(Math.random() * 3) + 1}.jpg`,
    title: `标题标题标题标题 ${id}`,
    exchangePrice: id * 1000,
    exchangeCount: id * 100,
    priority: id * 10,
    status: Math.floor(Math.random() * 2),
  })),
};

export const list1 = {
  errorCode: 0,
  data: {
    count: 99,
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
      id,
      pic: `/sample/image${Math.floor(Math.random() * 3) + 1}.jpg`,
      name: `标题标题标题标题 ${id}`,
      coin: id * 1000,
      exchangeNum: id * 100,
      sort: id * 10,
      status: Math.floor(Math.random() * 2),
    })),
  },
};
