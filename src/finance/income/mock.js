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
    takeEffectTime: '2016-07-01 12:12:12',
    lastEditTime: '2016-07-01 01:01:01',
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
      startTime: '2016-07-01 12:12:12',
      updateTime: '2016-07-01 01:01:01',
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
    takeEffectTime: '2016-07-01 12:12:12',
    lastEditTime: '2016-07-01 01:01:01',
    lastEditUser: `编辑用户 ${id}`,
  })),
};
export const listShiJing1 = {
  result: 0,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    templeId: id,
    templeName: `寺院名 ${id}`,
    rate: id / 10,
    startTime: '2016-07-01 12:12:12',
    updateTime: '2016-07-01 01:01:01',
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
    takeEffectTime: '2016-07-01 12:12:12',
    editTime: '2016-07-01 01:01:01',
    editUser: `编辑用户 ${id}`,
  })),
};
export const recordsFoShi1 = {
  result: 0,
  data: [1, 2, 3, 4, 5].map(id => ({
    rate: id * 10,
    startTime: '2016-07-01 12:12:12',
    addTime: '2016-07-01 01:01:01',
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
