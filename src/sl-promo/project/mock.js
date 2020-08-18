export const list = {
  success: true,
  data: {
    total: 99,
    list: '.'
      .repeat(20)
      .split('')
      .map((d, i) => ({
        id: i,
        // 名称
        name: '名称',
        // 封面
        cover: '/sample/image1.jpg',
        // 状态（-1：未开始，0：进行中，1：已结束）
        status: (i % 3) - 1,
        // 支付金额
        payAmount: 456,
        // 业务员分成金额
        businessProfit: 432,
        // 销售员分成金额
        sellerProfit: 432,
        // 成本金额
        costAmount: 789,
        // 总订单数
        totalOrders: 123,
        // 添加时间
        addTime: '2020-01-01 01:01:01',
        // 上架状态
        online: i % 2,
      })),
  },
};

export const listS = {
  errorCode: 0,
  data: {
    total: 99,
    list: '.'
      .repeat(20)
      .split('')
      .map((d, i) => ({
        commodityId: i,
        // 名称
        name: '名称',
        // 状态（-1：未开始，0：进行中，1：已结束）
        isEnd: (i % 3) - 1,
        // 支付金额
        payMoney: 456,
        // 业务员分成金额
        businessMoney: 432,
        // 销售员分成金额
        sellerMoney: 432,
        // 成本金额
        originalMoney: 789,
        // 总订单数
        orderNum: 123,
        // 添加时间
        addTime: '2020-01-01 01:01:01',
        // 上架状态
        status: i % 2,
      })),
  },
};

export const online = { success: true };
export const onlineS = { errorCode: 0 };
