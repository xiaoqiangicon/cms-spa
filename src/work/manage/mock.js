export const get_list = {
  msg: '',
  errorCode: 0,
  data: [
    {
      id: 1,
      name: '供花',
      payMoney: 1010.1, //当前金额
      targetMoney: 2000, //目标金额
      managerId: 100, //当前负责人Id
      managerName: '李仲羽', //当前负责人名字
      status: 0, //0进行中,1已结束
      changeTime: '2021-10-10', //开始负责日期
      creater: '管理员', //创建者名字
      contentIdList: '1000;2344;2457;', //子项Id
      contentIdNum: 3, //子项数量
    },
  ],
};

export const deliver = {
  msg: '成功',
  errorCode: 0,
};

export const end = {
  msg: '成功',
  errorCode: 0,
};
