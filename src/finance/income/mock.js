export const foShi = {
  success: true,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    key: id,
    name: `佛事 ${id}`,
    price: id * 100, // 价格
    promoteRate: id * 5, // 推广比率
    promoteAmount: id * 5, // 推广固定金额
    serviceRate: id * 5, // 服务费比率
    serviceAmount: id * 5, // 服务费固定金额
  })),
};

export const foShi1 = {
  result: 0,
  data: {
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
      id,
      key: id,
      name: `佛事 ${id}`,
      price: id * 100,
      promotionPercentage: id * 5,
      promotionMoney: id * 5,
      serviceMoney: id * 5,
    })),
  },
};

export const buddhistList = {
  msg: '',
  errorCode: 0,
  data: {
    list: [
      {
        name: '[1]供奉长生禄位',
        id: 1,
      },
      {
        name: '[2]供奉长生莲位',
        id: 2,
      },
    ],
    count: 5334,
  },
};

export const listFoShi = {
  success: true,
  totalCount: 99,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    key: id,
    templeId: id,
    templeName: `寺院名 ${id}`,
    foShiId: id,
    foShiName: `佛事名佛事名佛事名佛事名佛事名佛事名佛事名佛事名佛事名 ${id}`,
    serviceCharge: id * 10,
    takeEffectTime: '2019-07-01 12:12:12',
    lastEditTime: '2019-07-01 01:01:01',
    lastEditUser: `编辑用户 ${id}`,
    ended: Math.floor(Math.random() * 2),
    confirmed: Math.floor(Math.random() * 2),
    promoteRate: id * 5, // 推广比率
    promoteAmount: id * 5, // 推广固定金额
    serviceRate: id * 5, // 服务费比率
    serviceAmount: id * 5, // 服务费固定金额
  })),
};
export const listFoShi1 = {
  result: 0,
  data: {
    count: 99,
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
      templeId: id,
      templeName: `寺院名 ${id}`,
      commodityId: id,
      commodityName: `佛事名佛事名佛事名佛事名佛事名佛事名佛事名佛事名佛事名 ${id}`,
      rate: id / 10,
      startTime: '2019-07-01 12:12:12',
      updateTime: '2019-07-01 01:01:01',
      managerName: `编辑用户 ${id}`,
      isEnd: Math.floor(Math.random() * 2),
      isFinish: Math.floor(Math.random() * 2),
      promotionPercentage: id * 5,
      promotionMoney: id * 5,
      serviceMoney: id * 5,
    })),
  },
};

export const listShiJing = {
  success: true,
  totalCount: 99,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    key: id,
    templeId: id,
    templeName: `寺院名 ${id}`,
    serviceCharge: id * 10,
    takeEffectTime: '2019-07-01 12:12:12',
    lastEditTime: '2019-07-01 01:01:01',
    lastEditUser: `编辑用户 ${id}`,
  })),
};
export const listShiJing1 = {
  result: 0,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    templeId: id,
    templeName: `寺院名 ${id}`,
    rate: id / 10,
    startTime: '2019-07-01 12:12:12',
    updateTime: '2019-07-01 01:01:01',
    managerName: `编辑用户 ${id}`,
  })),
};

export const listGongFeng = listShiJing;
export const listGongFeng1 = listShiJing1;

export const recordsFoShi = {
  success: true,
  totalCount: 55,
  data: [1, 2, 3, 4, 5].map(id => ({
    id,
    key: id,
    serviceCharge: id * 10,
    takeEffectTime: '2019-07-01 12:12:12',
    editTime: '2019-07-01 01:01:01',
    editUser: `编辑用户 ${id}`,
  })),
};
export const recordsFoShi1 = {
  result: 0,
  data: [1, 2, 3, 4, 5].map(id => ({
    rate: id * 10,
    startTime: '2019-07-01 12:12:12',
    addTime: '2019-07-01 01:01:01',
    managerName: `编辑用户 ${id}`,
  })),
};

export const recordsShiJing = recordsFoShi;
export const recordsShiJing1 = recordsFoShi1;

export const recordsGongFeng = recordsFoShi;
export const recordsGongFeng1 = recordsFoShi1;

export const temples = {
  success: true,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    key: id,
    name: `寺院名 ${id}`,
  })),
};
export const temples1 = {
  result: 0,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    key: id,
    name: `寺院名 ${id}`,
  })),
};

export const addFoShi = { success: !0 };
export const addFoShi1 = { errorCode: 0 };
export const confirm = { success: !0 };
export const confirm1 = { errorCode: 0 };
export const updateShiJing = { success: !0 };
export const updateShiJing1 = { errorCode: 0 };
export const updateGongFeng = { success: !0 };
export const updateGongFeng1 = { errorCode: 0 };
export const updateFoShi = { success: !0 };
export const updateFoShi1 = { errorCode: 0 };

export const listZiYing = {
  success: true,
  totalCount: 99,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    foShiId: id,
    foShiName: `佛事名佛事名佛事名佛事名佛事名佛事名佛事名佛事名佛事名 ${id}`,
    amount: id * 1000, // 订单总额
    corporationProfitRate: id * 10, // 企业分成
    profitAmount: id * 100, // 当前营收
    usedAmount: id * 102, // 已支出
    manualAmount: id * 102, // 人工记录
    transformAmount: id * 102, // 转单系统
    remainAmount: id * 101, // 剩余金额
    ended: Math.floor(Math.random() * 2),
    type: (id % 2) + 1,
  })),
};

export const listZiYing1 = {
  result: 0,
  data: {
    cnt: 99,
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
      id,
      commodityId: id,
      commodityName: `佛事名佛事名佛事名佛事名佛事名佛事名佛事名佛事名佛事名 ${id}`,
      price: id * 1000, // 订单总额
      dividedPricePercentage: id * 10, // 企业分成
      earningsPrice: id * 100, // 当前营收
      expenditurePrice: id * 102, // 人工记录
      isEnd: Math.floor(Math.random() * 2),
      type: (id % 2) + 1,
    })),
  },
};

export const ziYingFoShi = {
  success: true,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    key: id,
    name: `佛事 ${id}`,
  })),
};

export const ziYingFoShi1 = {
  result: 0,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    name: `佛事 ${id}`,
  })),
};

export const updateZiYing = { success: !0 };
export const updateZiYing1 = { errorCode: 0 };
export const addZiYingUse = { success: !0 };
export const addZiYingUse1 = { errorCode: 0 };
export const delZiYingUse = { success: !0 };
export const delZiYingUse1 = { errorCode: 0 };

export const ziYingModifyRecords = {
  success: true,
  totalCount: 55,
  data: [1, 2, 3, 4, 5].map(id => ({
    id,
    corporationProfitRate: id * 10,
    editTime: '2019-07-01 01:01:01',
    editUser: `编辑用户 ${id}`,
  })),
};
export const ziYingModifyRecords1 = {
  result: 0,
  data: {
    list: [1, 2, 3, 4, 5].map(id => ({
      percentage: id * 10,
      addTime: '2019-07-01 01:01:01',
      account: `编辑用户 ${id}`,
    })),
    cnt: 55,
  },
};

export const ziYingUseRecords = {
  success: true,
  totalCount: 55,
  data: [1, 2, 3, 4, 5].map(id => ({
    id,
    desc: `desc ${id}`,
    amount: id * 10,
    editTime: '2019-07-01 01:01:01',
    editUser: `编辑用户 ${id}`,
  })),
};
export const ziYingUseRecords1 = {
  result: 0,
  data: {
    list: [1, 2, 3, 4, 5].map(id => ({
      content: `desc ${id}`,
      price: id * 10,
      addTime: '2019-07-01 01:01:01',
      account: `编辑用户 ${id}`,
    })),
    cnt: 55,
  },
};
