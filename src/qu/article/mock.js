import richText from '../../../sample/rich-text';

export const list = {
  success: !0,
  totalCount: 99,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    title: `title ${id}`,
    wxAccount: `wxAccount ${id}`,
    wxAuthor: `wxAuthor ${id}`,
    cover: `/images/chan-zai-128x128.png`,
    content: richText.repeat(5),
    addedToLibrary: id % 2,
    publishTime: '2019-01-01 01:01:01',
    pullTime: '2019-01-01 01:01:01',
  })),
};

export const list1 = {
  errorCode: 0,
  data: {
    count: 99,
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
      id,
      title: `title ${id}`,
      accounts: `wxAccount ${id}`,
      author: `wxAuthor ${id}`,
      articleImg: `/images/chan-zai-128x128.png,/images/chan-zai-128x128.png`,
      articleHtml: richText.repeat(5),
      isUse: id % 2,
      printTime: '2019-01-01 01:01:01',
      pullTime: '2019-01-01 01:01:01',
    })),
  },
};

export const add = { success: !0 };
export const add1 = { errorCode: 0 };
