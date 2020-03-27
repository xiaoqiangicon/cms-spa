import richText from '../../../sample/rich-text';

export const list = {
  success: !0,
  totalCount: 99,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    title: `title ${id}`,
    wxAccount: `wxAccount ${id}`,
    wxAuthor: `wxAuthor ${id}`,
    cover: `/images/logo.png`,
    content: richText.repeat(5),
    contentText:
      'contentTextcontentTextcontentTextcontentTextcontentTextcontentTextcontentText',
    addedToLibrary: id % 2,
    pullTime: '2019-01-01 01:01:01',
    hasImages: id % 2,
    hasVideos: id % 2,
    addedVideoToLibrary: id % 2,
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
      articleImg: `/images/logo.png,/images/logo.png`,
      articleHtml: richText.repeat(5),
      articleText:
        'contentTextcontentTextcontentTextcontentTextcontentTextcontentTextcontentText',
      isUse: id % 2,
      pullTime: '2019-01-01 01:01:01',
      articleVideo:
        'https://v.qq.com/iframe/preview.html?width=500&height=375&auto=0&vid=b09029kucqe',
      isUseVideo: id % 2,
    })),
  },
};

export const add = { success: !0 };
export const add1 = { errorCode: 0 };
