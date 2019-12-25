export const list = {
  success: !0,
  result: 1,
  data: {
    total: 1024,
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
      id,
      templeId: id,
      templeName: '弘法寺',
      mission: `完成${id}流水任务`,
      coin: id % 2 ? id : -id,
      userId: 100,
      userName: `操作人姓名${id}`,
      addTime: '2018-10-29',
      status: 0,
    })),
  },
};

export const templeList = {
  errorCode: 0,
  msg: '',
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map(id => ({
    id,
    name: `寺院名称${id}`,
  })),
};

export const insert = {
  msg: '',
  errorCode: 0,
};

export const del = {
  msg: '',
  errorCode: 0,
};

export const edit = {
  msg: '',
  errorCode: 0,
};
