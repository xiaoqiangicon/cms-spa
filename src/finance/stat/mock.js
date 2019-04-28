export const list = {
  success: !0,
  totalCount: 99,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    cover: `/images/chan-zai-128x128.png`,
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
      pic: `/images/chan-zai-128x128.png`,
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

export const temples = {
  success: !0,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    name: `temple-${id}`,
  })),
};

export const temples1 = {
  errorCode: 0,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    temple_name: `temple-${id}`,
  })),
};
