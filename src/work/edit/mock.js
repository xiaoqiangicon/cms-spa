export const detail = {
  msg: '成功',
  errorCode: 0,
  data: {
    id: 1,
    name: '供花',
    payMoney: 1010.1, //当前金额
    targetMoney: 2000, //目标金额
    managerId: 13, //当前负责人Id
    managerName: '李仲羽', //当前负责人名字
    status: 0, //0进行中,1已结束
    changeTime: '2021-10-10', //开始负责日期
    creater: '管理员', //创建者名字
    contentList: [
      {
        id: 1, //子项目Id
        contentId: 10, //目前是佛事Id
        type: 1, //1佛事，以后可能增加不同类型
        name: '佛事名',
        endTime: '2022-12-12', //结束日期
        isEnd: 0, //1结束0进行中
        addTime: '2022-12-10 12:00', //添加时间
      },
    ],
  },
};

export const nameList = {
  msg: '成功',
  errorCode: 0,
  data: [
    {
      id: 1,
      name: '佛事名',
      endTime: '2022-12-12', //结束日期
      isEnd: 0, //1结束0进行中
    },
    {
      id: 2,
      name: '佛事名2',
      endTime: '2022-12-12', //结束日期
      isEnd: 1, //1结束0进行中
    },
  ],
};

export const create = {
  msg: '成功',
  errorCode: 0,
};

export const managerList = {
  msg: '',
  errorCode: 0,
  data: [
    {
      id: 13,
      account: 'kin',
      name: '测试账号1',
    },
    {
      id: 16,
      account: 'test',
      name: '测试账号4',
    },
    {
      id: 18,
      account: 'anan',
      name: '测试账号6',
    },
    {
      id: 24,
      account: 'guoguo',
      name: '测试账号12',
    },
    {
      id: 29,
      account: 'lizhongyu',
    },
    {
      id: 37,
      account: 'xieshuwen',
    },
    {
      id: 38,
      account: 'test2B',
    },
    {
      id: 39,
      account: 'shengle',
    },
    {
      id: 41,
      account: '12312312312',
    },
    {
      id: 45,
      account: '14011111111',
    },
    {
      id: 46,
      account: '14022222222',
    },
    {
      id: 48,
      account: '14099999911',
    },
    {
      id: 52,
      account: '14099999914',
    },
    {
      id: 58,
      account: 'liqiang',
      name: '李强',
    },
    {
      id: 59,
      account: 'wangwei',
      name: '王玮',
    },
  ],
};
