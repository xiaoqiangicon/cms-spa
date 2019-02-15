export const list = {
  success: !0,
  totalCount: 99,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    title: `标题 ${id}`,
    content: `详情 ${id}`,
    startDate: `2019-01-${id + 10}`,
    endDate: `2019-02-${id + 10}`,
    priority: id * 2,
  })),
};

export const list1 = {
  errorCode: 0,
  data: {
    count: 99,
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
      id,
      title: `标题 ${id}`,
      details: `详情 ${id}`,
      startTime: `2019-01-${id + 10} 00:00:00`,
      endTime: `2019-02-${id + 10} 00:00:00`,
      top: id * 2,
    })),
  },
};

export const del = { success: !0 };
export const del1 = { errorCode: 0 };
export const add = { success: !0 };
export const add1 = { errorCode: 0 };
export const update = { success: !0 };
export const update1 = { errorCode: 0 };
