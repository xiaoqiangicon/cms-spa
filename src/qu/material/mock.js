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
    contentText:
      'contentTextcontentTextcontentTextcontentTextcontentTextcontentTextcontentText',
    status: (id % 3) - 1,
    publishAccount: (id % 3) + 1,
    region: '全国',
    canEdit: id % 2,
    publishAuthor: '推送作者',
    original: id % 2,
    createdAt: '2019-01-01 01:01:01',
    type: id % 2,
    videos:
      'https://v.qq.com/iframe/preview.html?width=500&height=375&auto=0&vid=b09029kucqe,https://v.qq.com/iframe/preview.html?width=500&height=375&auto=0&vid=b09029kucqe',
    video: '',
    videoDesc: '',
    publishTime: '2019-12-12 01:01:01',
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
      articleText:
        'contentTextcontentTextcontentTextcontentTextcontentTextcontentTextcontentText',
      status: (id % 3) - 1,
      pushAccount: (id % 3) + 1,
      area: '全国',
      canEdit: id % 2,
      printAuthor: '推送作者',
      isOriginal: id % 2,
      addTime: '2019-01-01 01:01:01',
      type: id % 2,
      articleVideo:
        'https://v.qq.com/iframe/preview.html?width=500&height=375&auto=0&vid=b09029kucqe,https://v.qq.com/iframe/preview.html?width=500&height=375&auto=0&vid=b09029kucqe',
      video: '',
      videoDetail: '',
      pullTime: '2019-12-12 01:01:01',
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
