export const businessList = {
  success: true,
  data: '.'
    .repeat(20)
    .split('')
    .map((d, i) => ({
      id: i + 1,
      // 用户名
      name: `用户名${i + 1}`,
      // 总订单数
      totalOrders: 123,
      // 总销售额
      totalAmount: 456,
      // 总收入
      totalIncome: 789,
    })),
};

export const businessListS = {
  errorCode: 0,
  data: '.'
    .repeat(20)
    .split('')
    .map((d, i) => ({
      businessId: i + 1,
      // 用户名
      businessName: `用户名${i + 1}`,
      // 总订单数
      // orderNum: 123,
      orderNum: Math.ceil(Math.random() * 1000),
      // 总销售额
      // orderMoney: 456,
      orderMoney: Math.ceil(Math.random() * 1000),
      // 总收入
      // businessMoney: 789,
      businessMoney: Math.ceil(Math.random() * 1000),
    })),
};

export const sellerList = {
  success: true,
  data: {
    total: 99,
    list: '.'
      .repeat(20)
      .split('')
      .map((d, i) => ({
        id: i + 1,
        // 销售员
        sellerUserId: i + 1,
        sellerUserName: '用户名',
        // 总收入
        totalIncome: 789,
        createTime: '2020-01-01 01:01:01',
        // 销售员所属的业务员
        businessUserId: i + 1,
        businessUserName: `业务员${i + 1}`,
      })),
  },
};

export const sellerListS = {
  errorCode: 0,
  data: {
    total: 99,
    list: '.'
      .repeat(20)
      .split('')
      .map((d, i) => ({
        id: i + 1,
        // 销售员
        sellerUserId: i + 1,
        sellerUserName: '用户名',
        // 总收入
        money: 789,
        addTime: '2020-01-01 01:01:01',
        // 销售员所属的业务员
        businessUserId: i + 1,
        businessUserName: `业务员${i + 1}`,
      })),
  },
};

export const allBusiness = {
  success: true,
  data: {
    list: '.'
      .repeat(20)
      .split('')
      .map((d, i) => ({
        id: i + 1,
        name: `业务员${i + 1}`,
      })),
  },
};

export const allBusinessS = {
  result: 0,
  data: {
    list: '.'
      .repeat(20)
      .split('')
      .map((d, i) => ({
        id: i + 1,
        name: `业务员${i + 1}`,
      })),
  },
};
