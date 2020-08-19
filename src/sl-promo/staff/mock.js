export const businessList = {
  success: true,
  data: {
    total: 99,
    list: '.'
      .repeat(20)
      .split('')
      .map((d, i) => ({
        id: i + 1,
        // 用户名
        name: `用户名${i + 1}`,
        // 电话号码
        phone: '12312312312',
        // 总订单数
        totalOrders: 123,
        // 总销售额
        totalAmount: 456,
        // 总收入
        totalIncome: 789,
        // 旗下销售员
        totalSellers: 3456,
        createTime: '2020-01-01 01:01:01',
      })),
  },
};

export const businessListS = {
  errorCode: 0,
  data: {
    total: 99,
    list: '.'
      .repeat(20)
      .split('')
      .map((d, i) => ({
        id: i + 1,
        // 用户名
        name: `用户名${i + 1}`,
        // 电话号码
        mobile: '12312312312',
        // 总订单数
        orderNum: 123,
        // 总销售额
        sales: 456,
        // 总收入
        sellerEarning: 789,
        // 旗下销售员
        sellerNum: 3456,
        addTime: '2020-01-01 01:01:01',
      })),
  },
};

export const updateBusiness = { success: true };
export const updateBusinessS = { errorCode: 0 };

export const delBusiness = { success: true };
export const delBusinessS = { errorCode: 0 };

export const sellerList = {
  success: true,
  data: {
    total: 99,
    list: '.'
      .repeat(20)
      .split('')
      .map((d, i) => ({
        id: i + 1,
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
        // 销售员所属的业务员id
        businessUserId: i + 1,
        businessUserName: `业务员${i + 1}`,
        businessUser: {
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
          totalIncome: 789,
          // 旗下销售员
          totalSellers: 3456,
          createTime: '2020-01-01 01:01:01',
        },
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
        // 销售员所属的业务员id
        businessUserId: i + 1,
        businessUser: {
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
          sellerEarning: 789,
          // 旗下销售员
          sellerNum: 3456,
          addTime: '2020-01-01 01:01:01',
        },
      })),
  },
};

export const updateSeller = { success: true };
export const updateSellerS = { errorCode: 0 };
