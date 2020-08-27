export const list = {
  success: true,
  data: {
    total: 99,
    list: '.'
      .repeat(20)
      .split('')
      .map((d, i) => ({
        id: i,
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
        status: i % 4,
        // 总订单数
        totalOrders: 123,
        // 总销售额
        totalAmount: 456,
        // 总收入
        totalIncome: 789,
        createTime: '2020-01-01 01:01:01',
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
        status: i % 4,
        // 总订单数
        orderNum: 123,
        // 总销售额
        sales: 456,
        // 总收入
        sellerEarning: 789,
        addTime: '2020-01-01 01:01:01',
      })),
  },
};

export const update = { success: true };
export const updateS = { errorCode: 0 };
