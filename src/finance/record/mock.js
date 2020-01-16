export const list = {
  success: true,
  totalCount: 99,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    key: id,
    recordName: `记录名称 ${id}`,
    incomeFromId: id,
    incomeFrom: `营收来源 ${id}`,
    relatedItemId: id,
    relatedItem: `相关模块 ${id}`,
    income: id * 10,
    incomeTime: '2016-07-01 12:12:12',
    editUser: `编辑用户 ${id}`,
  })),
};

export const list1 = {
  result: 0,
  data: {
    count: 99,
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
      id,
      title: `记录名称 ${id}`,
      templeId: id,
      templeName: `营收来源 ${id}`,
      type: [2, 4, 6][Math.floor(Math.random() * 3)],
      money: id * 10,
      getDate: '2016-07-01 12:12:12',
      managerName: `编辑用户 ${id}`,
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

export const del = { success: !0 };
export const del1 = { errorCode: 0 };
export const add = { success: !0 };
export const add1 = { errorCode: 0 };
export const update = { success: !0 };
export const update1 = { errorCode: 0 };
