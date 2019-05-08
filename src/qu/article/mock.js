export const list1 = {
  errorCode: 0,
  data: {
    totalCount: 99,
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
      id,
      cover: `/sample/image${Math.floor(Math.random() * 3) + 1}.jpg`,
      title: `标题标题标题标题 ${id}`,
      templeName: `寺院${id}`,
      time: '2019-01-01 01:01:01',
      content: 'asdasodqwifmewf佛nofoe威风威风慰问费我仿佛违反',
      isSource: Math.floor(Math.random() * 2),
      isVideo: Math.floor(Math.random() * 2),
      isRead: Math.floor(Math.random() * 2),
    })),
  },
};

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

export const add1 = {
  errorCode: 0,
  data: {},
};

export const add = {
  success: true,
  data: {},
};
