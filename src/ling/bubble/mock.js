export const list = {
  success: !0,
  totalCount: 99,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    cover: `/images/logo.png`,
    text: `气泡文字 ${id}`,
    frequency: Math.floor(Math.random() * 2) + 1,
    startDate: `2019-01-${id + 10}`,
    endDate: `2019-02-${id + 10}`,
    startHour: id,
    endHour: id + 10,
    redirect: Math.floor(Math.random() * 3) + 1,
    link: '/link',
    shareImageType: Math.floor(Math.random() * 3) + 1,
    entryId: id,
  })),
};

export const list1 = {
  errorCode: 0,
  data: {
    count: 99,
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
      id,
      pic: `/images/logo.png`,
      title: `气泡文字 ${id}`,
      appearType: Math.floor(Math.random() * 2) + 1,
      startDate: `2019-01-${id + 10}`,
      endDate: `2019-02-${id + 10}`,
      startHour: id,
      endHour: id + 10,
      jumpType: Math.floor(Math.random() * 3) + 1,
      jumpUrl: '/link',
      sharePicType: Math.floor(Math.random() * 3) + 1,
      wishTypeId: id,
    })),
  },
};

export const del = { success: !0 };
export const del1 = { errorCode: 0 };
export const add = { success: !0 };
export const add1 = { errorCode: 0 };
export const update = { success: !0 };
export const update1 = { errorCode: 0 };
