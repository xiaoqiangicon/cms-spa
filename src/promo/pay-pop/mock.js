export const list = {
  success: true,
  totalCount: 99,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    // 标题
    title: `寺院 ${id}`,
    // 封面
    cover: '/sample/image1.jpg',
    // 开始时间
    startTime: '2020-01-01 01:01:01',
    // 结束时间
    endTime: '2020-02-01 01:01:01',
    // 排序（越大越靠前）
    sort: id,
    // 跳转链接
    redirect: `/link-${id}`,
    // 模块（0: 全部, 1: 佛事, 2: 千寺祈福, 3: 日行一善, 4: 法师加持, 5: 法师供养, 6: 功德箱）
    moduleId: 0,
    // 模块内容ID（0表示全部）
    moduleContentId: 1,
    // 最少金额
    minAmount: id,
    // 最大金额
    maxAmount: id * 10,
    // 精细化运营用户分组（0表示全部）
    userGroupId: 1,
    // 是否已经注册app（0：不限制，1：已经注册，2：没有注册）
    registerApp: 1,
    // 用户注册多少天（0表示当天）
    registeredDays: 10,
    // 支付环境（0：不限制，1：app，2：微信）
    payEnv: 1,
    // 是否只显示一次（1：是，0：否）
    showOnce: 1,
    // 点击数
    clickCount: id * 10,
    // 关闭数
    closeCount: id * 11,
  })),
};

export const list1 = {
  errorCode: 0,
  data: {
    total: 99,
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
      id,
      // 标题
      title: `寺院 ${id}`,
      // 封面
      pic: id % 2 ? '/sample/image1.jpg' : '',
      // 开始时间
      startDate: '2020-01-01 01:01:01',
      // 结束时间
      endDate: '2020-07-01 01:01:01',
      // 排序（越大越靠前）
      sort: id,
      // 跳转链接
      url: `/link-${id}`,
      // 模块（0: 全部, 1: 佛事, 2: 千寺祈福, 3: 日行一善, 4: 法师加持, 5: 法师供养, 6: 功德箱）
      moudelType: 0,
      // 模块内容ID（0表示全部）
      moudelId: 1,
      // 最少金额
      startMoney: id,
      // 最大金额
      endMoney: id * 10,
      // 精细化运营用户分组（0表示全部）
      userGroupId: 1,
      // 是否已经注册app（0：不限制，1：已经注册，2：没有注册）
      isRegisterApp: 1,
      // 用户注册多少天（0表示当天）
      registerDay: 10,
      // 支付环境（0：不限制，1：app，2：微信）
      payType: 1,
      // 是否只显示一次（1：是，0：否）
      isClick: 1,
      // 点击数
      clickNum: id * 10,
      // 关闭数
      closeNum: id * 11,
    })),
  },
};

export const del = { success: !0 };
export const del1 = { errorCode: 0 };
export const add = { success: !0 };
export const add1 = { errorCode: 0 };
export const update = { success: !0 };
export const update1 = { errorCode: 0 };

export const userGroups = {
  success: !0,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    name: `name ${id}`,
  })),
};

export const userGroups1 = {
  errorCode: 0,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    name: `name ${id}`,
  })),
};
