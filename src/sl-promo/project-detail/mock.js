export const selections = {
  success: true,
  data: '.'
    .repeat(20)
    .split('')
    .map((d, i) => ({
      id: i + 1,
      // 用户名
      name: `用户名${i + 1}`,
      // 封面
      cover: '/sample/image1.jpg',
      // 成本价
      costPrice: 123,
      // 胜乐供给业务员的价格
      channelPrice: 345,
    })),
};

export const selectionsS = {
  errorCode: 0,
  data: '.'
    .repeat(20)
    .split('')
    .map((d, i) => ({
      id: i + 1,
      // 用户名
      name: `用户名${i + 1}`,
      // 封面
      pic: '/sample/image1.jpg',
      // 成本价
      price: 123,
      // 胜乐供给业务员的价格
      companyMoney: 345,
    })),
};

export const updateSelection = { success: true };
export const updateSelectionS = { errorCode: 0 };

export const saleList = {
  success: true,
  data: {
    total: 99,
    list: '.'
      .repeat(20)
      .split('')
      .map((d, i) => ({
        id: i,
        // 订单号码
        orderNum: '订单号码',
        // 名称
        name: '名称',
        // 状态（1未处理 2确认中 0已处理）
        status: i % 3,
        // 支付金额
        payAmount: 456,
        // 零售价
        saleAmount: 432,
        // 业务员收入
        businessIncome: 789,
        // 销售员收入
        sellerIncome: 789,
        // 供应价
        originalPrice: 654,
        // 支付时间
        payTime: '支付时间',
        // 销售员所属的业务员id
        businessUserId: i + 1,
        businessUserName: `业务员${i + 1}`,
        // 销售员所属的业务员id
        sellerUserId: i + 1,
        sellerUserName: `销售员${i + 1}`,
      })),
  },
};

export const saleListS = {
  errorCode: 0,
  data: {
    total: 99,
    list: '.'
      .repeat(20)
      .split('')
      .map((d, i) => ({
        id: i,
        // 订单号码
        orderNo: '订单号码',
        // 名称
        contentName: '名称',
        // 状态（1未处理 2确认中 0已处理）
        status: i % 3,
        // 支付金额
        orderMoney: 456,
        // 业务员收入
        businessMoney: 789,
        // 销售员收入
        sellerMoney: 789,
        // 供应价
        contentOrderMoney: 654,
        // 支付时间
        payTime: '支付时间',
        // 销售员所属的业务员id
        businessUserId: i + 1,
        businessUserName: `业务员${i + 1}`,
        // 销售员所属的业务员id
        sellerUserId: i + 1,
        sellerUserName: `销售员${i + 1}`,
      })),
  },
};

export const offline = { success: true };
export const offlineS = { errorCode: 0 };
