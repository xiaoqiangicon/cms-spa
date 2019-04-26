export const orders = {
  success: !0,
  data: {
    account: {
      // 银行名称
      bankName: 'bankName',
      // 支行名称
      subBankName: 'subBankName',
      // 银行开户名称
      accountName: 'accountName',
      // 银行卡号
      accountNumber: 'accountNumber',
    },
    dateItems: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
      year: 2019,
      month: id,
      orders: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(subId => ({
        id: id * 100 + subId,
        title: `标题标题标题标题标题标题标题标题-${id * 100 + subId}`,
        // 数量
        count: id * 1000 + subId,
        // 金额
        amount: id * 1000 + subId,
        // 增值服务费
        increaseCharge: id * 100 + subId,
        // 渠道服务费
        channelCharge: id * 101 + subId,
        // 渠道服务费补贴
        channelSubsidy: id * 102 + subId,
        // 功能服务费
        functionCharge: id * 103 + subId,
        // 推广员奖励金
        promoterReward: id * 104 + subId,
        // 推广中
        inPromoting: subId === 1 ? 1 : 0,
      })),
    })),
  },
};

export const temples1 = { errorCode: 0 };
