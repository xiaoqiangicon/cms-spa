export const businessList = {
  success: true,
  data: {
    total: 99,
    list: '.'
      .repeat(20)
      .split('')
      .map((d, i) => ({
        id: i,
        // 用户名
        name: '用户名',
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

export const businessList1 = {
  errorCode: 0,
  data: {
    total: 99,
    list: '.'
      .repeat(20)
      .split('')
      .map((d, i) => ({
        id: i,
        // 用户名
        name: '用户名',
        // 电话号码
        mobile: '12312312312',
        // 总订单数
        orderNum: 123,
        // 总销售额
        sales: 456,
        // 总收入
        sellerEarning: 789,
        // 旗下销售员
        totalSellers: 3456,
        addTime: '2020-01-01 01:01:01',
      })),
  },
};

export const updateBusiness = { success: true };
export const updateBusiness1 = { errorCode: 0 };

export const delBusiness = { success: true };
export const delBusiness1 = { errorCode: 0 };
