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
      type: 1,
      identityCardPic: '',
      identityCardPic2: '',
      certificatePicUrl:
        'https://pic.zizaihome.com/d8df2110-5564-11e7-acfa-00163e022fdd.jpg',
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
        // 是否是推广佛事
        isPromotionFoShi: subId % 2,
        // 推广佛事比例列表
        promotionRateList: [1, 2, 3, 4, 5].map(id3 => ({
          rate: id3 * 10,
          createTime: '2019-01-01 01:01:01',
        })),
        start: 1234,
        billList: [
          {
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
            // 是否是推广佛事
            isPromotionFoShi: subId % 2,
            income_time: '2019-08',
          },
          {
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
            // 是否是推广佛事
            isPromotionFoShi: subId % 2,
            income_time: '2019-08',
          },
        ],
      })),
    })),
    // 回单照片
    feedbackImages: [
      '/sample/image1.jpg',
      '/sample/image2.jpg',
      '/sample/image3.jpg',
      '/sample/image4.jpg',
    ],
    placeNoPic: 'https://pic.zizaihome.com/1488248797332.jpg',
    certificatePic:
      'https://pic.zizaihome.com/07aa82ce-d541-4ca8-8654-d59717aeaf71.jpg',
    lastPushMoneyPic:
      'https://pic.zizaihome.com/6b41539a-11a4-42e4-8794-f5e334471931.jpg',
    createTime: 'createTime',
    updateTime: 'updateTime',
  },
};

export const orders1 = {
  errorCode: 0,
  data: {
    bank: {
      // 银行名称
      bankName: 'bankName',
      // 支行名称
      bankBranchName: 'subBankName',
      // 银行开户名称
      bankCardUserName: 'accountName',
      // 银行卡号
      bankCardNumber: 'accountNumber',
      type: 1,
      identityCardPic: '',
      identityCardPic2: '',
      certificatePicUrl:
        'https://pic.zizaihome.com/d8df2110-5564-11e7-acfa-00163e022fdd.jpg',
    },
    pickUpMoneyList: [1, 2, 3, 4, 5, 6, 7, 8, 9].map(id => ({
      month: `2019-0${id}`,
      pickUpList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(subId => ({
        id: id * 100 + subId,
        name: `标题标题标题标题标题标题标题标题-${id * 100 + subId}`,
        // 数量
        order_num: id * 1000 + subId,
        // 金额
        price: id * 1000 + subId,
        // 增值服务费
        percentMoney: id * 100 + subId,
        // 渠道服务费
        counter_fee: id * 101 + subId,
        // 渠道服务费补贴
        subsidy_counter_fee: id * 102 + subId,
        // 功能服务费
        serviceMoney: id * 103 + subId,
        // 推广员奖励金
        promotionMoney: id * 104 + subId,
        // 推广佛事比例列表
        rateList:
          subId % 2
            ? []
            : [1, 2, 3, 4, 5].map(id3 => ({
                rate: id3 * 10,
                addTime: '2019-01-01 01:01:01',
              })),
        billList: [
          {
            name: `标题标题标题标题标题标题标题标题-${id * 100 + subId}`,
            // 数量
            order_num: id * 1000 + subId,
            // 金额
            price: id * 1000 + subId,
            // 增值服务费
            percentMoney: id * 100 + subId,
            // 渠道服务费
            counter_fee: id * 101 + subId,
            // 渠道服务费补贴
            subsidy_counter_fee: id * 102 + subId,
            // 功能服务费
            serviceMoney: id * 103 + subId,
            // 推广员奖励金
            promotionMoney: id * 104 + subId,
            // 是否是推广佛事
            isPromotionFoShi: subId % 2,
            income_time: '2019-08',
            // 推广佛事比例列表
            rateList:
              subId % 2
                ? []
                : [1, 2, 3, 4, 5].map(id3 => ({
                    rate: id3 * 10,
                    addTime: '2019-01-01 01:01:01',
                  })),
          },
          {
            name: `标题标题标题标题标题标题标题标题-${id * 100 + subId}`,
            // 数量
            order_num: id * 1000 + subId,
            // 金额
            price: id * 1000 + subId,
            // 增值服务费
            percentMoney: id * 100 + subId,
            // 渠道服务费
            counter_fee: id * 101 + subId,
            // 渠道服务费补贴
            subsidy_counter_fee: id * 102 + subId,
            // 功能服务费
            serviceMoney: id * 103 + subId,
            // 推广员奖励金
            promotionMoney: id * 104 + subId,
            // 是否是推广佛事
            isPromotionFoShi: subId % 2,
            income_time: '2019-08',
            // 推广佛事比例列表
            rateList:
              subId % 2
                ? []
                : [1, 2, 3, 4, 5].map(id3 => ({
                    rate: id3 * 10,
                    addTime: '2019-01-01 01:01:01',
                  })),
          },
        ],
      })),
    })),
    // 回单照片
    picList: [
      '/sample/image1.jpg',
      '/sample/image2.jpg',
      '/sample/image3.jpg',
      '/sample/image4.jpg',
    ],
    placeNoPic: 'https://pic.zizaihome.com/1488248797332.jpg',
    certificatePic:
      'https://pic.zizaihome.com/07aa82ce-d541-4ca8-8654-d59717aeaf71.jpg',
    lastPushMoneyPic:
      'https://pic.zizaihome.com/6b41539a-11a4-42e4-8794-f5e334471931.jpg',
    addTime: 'createTime',
    updateTime: 'updateTime',
  },
};

export const remarks = {
  success: !0,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    content: `content ${id}`,
    takeEffect: id % 2,
  })),
};

export const remarks1 = {
  errorCode: 0,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    title: `content ${id}`,
    status: id % 2,
  })),
};

export const updateRemark = { success: !0 };
export const updateRemark1 = { errorCode: 0 };

export const info = {
  success: !0,
  data: {
    templeId: 12,
    templeName: 'templeName',
    type: 2,
    isQuestion: 0,
    question: 'question',
    answer: 'answer',
    typeText: 'typeText',
  },
};

export const info1 = {
  errorCode: 0,
  data: {
    templeId: 12,
    templeName: 'templeName',
    type: 2,
    isQuestion: 1,
    question: 'question',
    answer: 'answer',
    typeText: 'typeText',
  },
};

export const answer = { success: !0 };
export const answer1 = { errorCode: 0 };

export const confirm = { success: !0 };
export const confirm1 = { errorCode: 0 };

export const finish = { success: !0 };
export const finish1 = { errorCode: 0 };

export const add = { success: !0 };
export const add1 = { errorCode: 0 };
