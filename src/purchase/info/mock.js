export const list = {
  msg: '成功',
  errorCode: 0,
  data: {
    list: [
      {
        id: 1,
        name: '项目名',
        memo: '备注',
        managerId: 100,
        managerName: '管理员名字',
        addTime: '2021-01-01 12:00', //添加时间
        totalItem: 100, //总计物品件数
        totalMoney: 10000, //总计金额，单位分
        totalExpressNo: 10, //总计快递数
      },
    ],
    total: 100, //总条数
    pageNo: 1, //当前页码
  },
};

export const addProject = {
  msg: '成功',
  errorCode: 0,
  data: {
    id: 1,
  },
};

export const del = {
  msg: '成功',
  errorCode: 0,
};

export const projectPDF = {
  msg: '成功',
  errorCode: 0,
  data: {
    url: 'http://a.pdf',
  },
};
