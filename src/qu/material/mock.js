import richText from '../../../sample/rich-text';

export const list = {
  success: !0,
  totalCount: 99,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    title: `title ${id}`,
    cover: `/images/chan-zai-128x128.png`,
    covers: `/sample/image1.jpg,/sample/image2.jpg`,
    content: richText,
    status: (id % 3) - 1,
    publishAccount: (id % 3) + 1,
    region: '全国',
    canEdit: id % 2,
    createdAt: '2019-01-01 01:01:01',
  })),
};

export const list1 = {
  errorCode: 0,
  data: {
    count: 99,
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
      id,
      title: `title ${id}`,
      titleImg: `/sample/image1.jpg,/sample/image2.jpg`,
      articleHtml: richText,
      status: (id % 3) - 1,
      pushAccount: (id % 3) + 1,
      area: '全国',
      canEdit: id % 2,
      addTime: '2019-01-01 01:01:01',
    })),
  },
};

export const del = { success: !0 };
export const del1 = { errorCode: 0 };
export const add = { success: !0 };
export const add1 = { errorCode: 0 };
export const update = { success: !0 };
export const update1 = { errorCode: 0 };
export const restore = { success: !0 };
export const restore1 = { errorCode: 0 };
