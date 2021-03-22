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
        contentName: '名称',
        // 规格名字
        contentDetail: '规格名字',
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
        contentName: '名称',
        // 规格名字
        contentDetail: '规格名字',
        // 状态（1未处理 2确认中 0已处理）
        status: i % 3,
        // 支付金额
        orderMoney: 456,
        // 业务员收入
        businessMoney: 789,
        // 销售员收入
        sellerMoney: 789,
        // 支付时间
        payTime: '支付时间',
      })),
  },
};

export const detail = {
  success: true,
  data: {
    id: 11,
    // 用户名
    name: `用户名11`,
    // 电话号码
    phone: '12312312312',
    // 总订单数
    totalOrders: 123,
    // 总销售额
    totalAmount: 456,
    // 总收入
    totalIncome: 567,
    // 销售员总收入
    sellersTotalIncome: 789,
    // 旗下销售员
    totalSellers: 3456,
    createTime: '2020-01-01 01:01:01',
  },
};

export const detailS = {
  errorCode: 0,
  data: {
    id: 11,
    // 用户名
    name: `用户名11`,
    // 电话号码
    mobile: '12312312312',
    // 总订单数
    orderNum: 123,
    // 总销售额
    sales: 456,
    // 总收入
    earning: 567,
    // 销售员总收入
    sellerEarning: 789,
    // 旗下销售员
    sellerNum: 3456,
    addTime: '2020-01-01 01:01:01',
  },
};
