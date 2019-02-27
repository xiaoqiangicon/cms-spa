export const list = {
  success: !0,
  totalCount: 99,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    title: `标题${id}`,
    status: Math.floor(Math.random() * 3) + 1,
    hasGuard: Math.floor(Math.random() * 2),
    guardName: `守护者${id}`,
    guardTags: '标签1,标签2,标签3',
    guardAvatar: '/images/chan-zai-128x128.png',
    guardLargeAvatar: '/images/chan-zai-128x128.png',
    guardIntro: `介绍${id}`,
    guardBtn: `按钮${id}`,
    attachCover: '/images/chan-zai-128x128.png',
    shareImage: '/images/chan-zai-128x128.png',
    publishDate: '2019-01-01',
    endDate: '2019-01-02',
    wishCount: id * 10,
    priority: id * 10,
    hide: Math.floor(Math.random() * 2),
    bookmarkImage: '/images/chan-zai-128x128.png',
  })),
};

export const list1 = {
  errorCode: 0,
  data: {
    count: 99,
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
      id,
      name: `标题${id}`,
      type: Math.floor(Math.random() * 3) + 1,
      top: Math.floor(Math.random() * 2) + 1,
      hasGuard: Math.floor(Math.random() * 2),
      guardName: `守护者${id}`,
      guardTab: '标签1,标签2,标签3',
      guardImg: '/images/chan-zai-128x128.png',
      guardBigImg: '/images/chan-zai-128x128.png',
      guardDetail: `介绍${id}`,
      buttonName: `按钮${id}`,
      pic: '/images/chan-zai-128x128.png',
      shareImg: '/images/chan-zai-128x128.png',
      beginTime: '2019-01-01',
      endTime: '2019-01-02',
      wishNum: id * 10,
      priority: id * 10,
      status: Math.floor(Math.random() * 2),
      bookMarkImg: '/images/chan-zai-128x128.png',
    })),
  },
};

export const del = { success: !0 };
export const del1 = { errorCode: 0 };
export const add = { success: !0 };
export const add1 = { errorCode: 0 };
export const update = { success: !0 };
export const update1 = { errorCode: 0 };
