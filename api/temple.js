const numText = ['', '一', '二', '三', '四', '五', '六', '七', '八'];

// 获取寺院列表
export const list = {
  errorCode: 0,
  data: [1, 2, 3, 4, 5, 6, 7, 8].map(id => ({
    id,
    name: `寺院名称寺院名称 ${numText[id]}`,
  })),
};

// 获取寺院推送信息列表
export const getTempleMessage = {
  msg: '',
  errorCode: 0,
  data: {
    data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
      id,
      title: '标题标题标题标题标题',
      url: 'http://test.com/',
      content:
        '测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下',
      templeId: id,
      templeName: `深圳弘法寺(测试) ${id}`,
      addTime: '2020-02-04 18:32:20',
      updateTime: '2020-02-04 18:32:20',
      status: 0,
      isRed: 0,
    })),
    total: 22,
  },
};

// 推送寺院消息
export const pushTempleMessage = {
  msg: '',
  errorCode: 0,
  data: '',
};

// 获取积分活动列表
export const getTempleMissionList = {
  msg: '',
  errorCode: 0,
  data: {
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
      id,
      title: '标题标题标题标题标题',
      content: '测试一下测试一下测试一下测试一下测试一下',
      status: id % 2 ? 0 : 1,
      integral: 10,
      userId: 37,
      userName: 'xieshuwen',
      addTime: '2020-02-04 18:32:20',
      updateTime: '2020-02-04 18:32:20',
    })),
    total: 22,
  },
};

// 添加和编辑积分活动
export const addAndUpdateTempleMission = {
  msg: '',
  errorCode: 0,
  data: '',
};

// 发布或者删除积分活动
export const updateTempleMissionStatus = {
  msg: '',
  errorCode: 0,
  data: '',
};
