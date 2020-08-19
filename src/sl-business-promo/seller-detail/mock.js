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

export const detail = {
  success: true,
  data: {
    id: 11,
    // 昵称
    nickname: '昵称',
    // 用户名
    name: '用户名',
    // 用户头像
    avatar: '/images/logo.png',
    // 电话号码
    phone: '12312312312',
    // 备注
    remark: '备注',
    // 状态（0正常 1审核中 2禁用 3不通过 -1删除）
    status: 0,
    // 总订单数
    totalOrders: 123,
    // 总销售额
    totalAmount: 456,
    // 总收入
    totalIncome: 789,
    createTime: '2020-01-01 01:01:01',
    // 销售员所属的业务员id
    businessUserId: 22,
    businessUserName: `业务员22`,
  },
};

export const detailS = {
  errorCode: 0,
  data: {
    id: 11,
    // 昵称
    nickName: '昵称',
    // 用户名
    name: '用户名',
    // 用户头像
    headImg: '/images/logo.png',
    // 电话号码
    mobile: '12312312312',
    // 备注
    remark: '备注',
    // 状态（0正常 1审核中 2禁用 3不通过 -1删除）
    status: 0,
    // 总订单数
    orderNum: 123,
    // 总销售额
    sales: 456,
    // 总收入
    sellerEarning: 789,
    addTime: '2020-01-01 01:01:01',
    // 销售员所属的业务员id
    businessUserId: 22,
    businessUserName: `业务员22`,
  },
};
