export const list = {
  success: !0,
  totalCount: 99,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    name: `name ${id}`,
    account: `account ${id}`,
    groupId: id,
    interval: id,
    lastPullTime: '2019-01-01 01:01:01',
  })),
};

export const list1 = {
  errorCode: 0,
  data: {
    count: 99,
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
      id,
      name: `name ${id}`,
      wxid: `account ${id}`,
      groupId: id,
      updateDays: id,
      lastUpdateTime: '2019-01-01 01:01:01',
    })),
  },
};

export const del = { success: !0 };
export const del1 = { errorCode: 0 };
export const add = { success: !0 };
export const add1 = { errorCode: 0 };
export const update = { success: !0 };
export const update1 = { errorCode: 0 };

export const groupList = {
  success: !0,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    name: `name ${id}`,
  })),
};

export const groupList1 = {
  errorCode: 0,
  data: {
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
      id,
      name: `name ${id}`,
    })),
  },
};

export const groupDel = { success: !0 };
export const groupDel1 = { errorCode: 0 };
export const groupAdd = { success: !0 };
export const groupAdd1 = { errorCode: 0 };
export const groupUpdate = { success: !0 };
export const groupUpdate1 = { errorCode: 0 };
export const addToGroup = { success: !0 };
export const addToGroup1 = { errorCode: 0 };
