export const list = {
  success: true,
  totalCount: 99,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    key: id,
    templeId: id,
    templeName: `寺院 ${id}`,
    content: `备注内容备注内容备注内容备注内容备注内容备注内容备注内容备注内容 ${id}`,
    editUser: `编辑用户 ${id}`,
    publishTime: '2016-07-01 12:12:12',
    takeEffect: Math.floor(Math.random() * 2),
  })),
};

export const list1 = {
  result: 0,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    templeId: id,
    templeName: `寺院 ${id}`,
    title: `备注内容备注内容备注内容备注内容备注内容备注内容备注内容备注内容 ${id}`,
    managerName: `编辑用户 ${id}`,
    addTime: '2016-07-01 12:12:12',
    status: Math.floor(Math.random() * 2),
  })),
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
export const switch0 = { success: !0 };
export const switch1 = { errorCode: 0 };
