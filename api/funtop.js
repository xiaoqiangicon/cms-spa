import richText from '../sample/rich-text';

export const getGroupList = {
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

export const getPullList = {
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

export const addToUse = { errorCode: 0 };
