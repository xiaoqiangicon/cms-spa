// 弹窗广告列表
export const getErpADList = {
  msg: '',
  errorCode: 0,
  data: {
    data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
      id,
      sort: 1 + id,
      articleId: 100,
      name: `测试${id}`,
      addTime: '2019-12-20 16:34:57',
      updateTime: '2019-12-20 17:39:28',
      endTime: '2019-12-26 16:34:58',
      status: 0,
      picUrl:
        'https://pic.zizaihome.com/9188bd76-60c6-4747-8d28-aa2d43077112.png',
      startTime: '2019-12-20 17:28:15',
      visitNum: 2696,
    })),
    total: 22,
  },
};

// 添加|更新弹窗广告信息
export const addAndUpdateErpAD = {
  msg: '',
  errorCode: 0,
  data: '',
};
