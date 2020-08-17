export const list = {
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
        // 支付时间
        payTime: '支付时间',
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
        id: i,
        // 订单号码
        orderNo: '订单号码',
        // 名称
        name: '名称',
        // 状态（1未处理 2确认中 0已处理）
        status: i % 3,
        // 支付金额
        contentOrderMoney: 456,
        // 业务员收入
        businessMoney: 789,
        // 销售员收入
        sellerMoney: 789,
        // 支付时间
        payTime: '支付时间',
      })),
  },
};
