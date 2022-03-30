export const list = {
  msg: '',
  errorCode: 0,
  data: [
    {
      id: 16,
      userType: 0,
      provinceJson: {
        symbol: 1,
        province: '青海省',
      },
      cityJson: {
        symbol: 1,
        city: '唐山市',
      },
      registerTime: 100,
      registerTimeStart: '',
      registerTimeEnd: '',
      ruleJson: [
        {
          startDate: '2022-03-03',
          endDate: '2022-03-10',
          type: 2,
          contentId: '4,6',
          symbol: 4,
          number: 10,
          number2: 100,
          ruleName: 'paySuccess',
        },
        {
          days: 10,
          type: 2,
          contentId: '5,6',
          symbol: 4,
          number: 10,
          number2: 100,
          ruleName: 'payMoney',
        },
        {
          days: 100,
          symbol: 1,
          ruleName: 'startApp',
        },
      ],
      name: '12341',
      addTime: '2020-05-08 18:26',
      status: 0,
      ruleType: 2,
      total: 0,
      wxtagId: 0,
      default_userId: '',
      count: 0,
      downloadUrl: '/oprule/downloadExcel?ruleId=16',
    },
    {
      id: 222,
      userType: 0,
      provinceJson: {
        symbol: 1,
        province: '河北省',
      },
      cityJson: {
        symbol: 0,
        city: '唐山市',
      },
      registerTime: 0,
      registerTimeStart: '2022-03-03',
      registerTimeEnd: '2022-03-08',
      ruleJson: [
        {
          days: 14,
          type: 0,
          contentId: '4,6',
          symbol: 1,
          number: 14,
          number2: 0,
          ruleName: 'paySuccess',
        },
        {
          days: 12,
          type: 0,
          contentId: '5,6',
          symbol: 3,
          number: 22,
          number2: 0,
          ruleName: 'payMoney',
        },
        {
          startDate: '2022-03-04',
          endDate: '2022-03-09',
          symbol: 0,
          ruleName: 'startApp',
        },
      ],
      name: '测试',
      addTime: '2022-03-04 10:35',
      status: 0,
      ruleType: 2,
      total: 0,
      wxtagId: 0,
      default_userId: '120,1234,23421',
      count: 0,
      downloadUrl: '/oprule/downloadExcel?ruleId=222',
    },
  ],
};

export const del = {
  errorCode: 0,
  msg: '成功',
};

export const save = {
  errorCode: 0,
  msg: '成功',
};
