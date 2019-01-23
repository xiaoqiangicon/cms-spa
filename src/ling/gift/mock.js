export const list = {
  success: !0,
  totalCount: 99,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    date: `2019-01-${id + 20}`,
    type: Math.floor(Math.random() * 2) + 1,
    amount: id * 100,
  })),
};

export const list1 = {
  errorCode: 0,
  data: {
    count: 99,
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
      id,
      giftDate: `2019-01-${id + 20} 01:01:01`,
      telMoney: id % 2 ? id * 100 : 0,
      cash: id % 2 ? 0 : id * 100,
    })),
  },
};

export const del = { success: !0 };
export const del1 = { errorCode: 0 };
export const add = { success: !0 };
export const add1 = { errorCode: 0 };
export const update = { success: !0 };
export const update1 = { errorCode: 0 };
