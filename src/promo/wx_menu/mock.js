export const edit = {
  msg: '',
  errorCode: 0,
};

export const list = {
  msg: '',
  errorCode: 0,
  data: [
    {
      id: 1,
      name: '默认菜单',
      type: 0,
      menuJson: {
        menu: {
          button: [
            {
              name: '佛语日签',
              sub_button: [
                {
                  type: 'view',
                  name: '实景祈福',
                  url: 'https://wx.zizaihome.com/vr/devoteListHtml',
                },
                {
                  type: 'view',
                  name: '在线抄经',
                  url: 'https://wx.zizaihome.com/chanzai/chaojing',
                },
                {
                  type: 'view',
                  name: '佛语日签',
                  url: 'https://wx.zizaihome.com/sign/daySignHtml',
                },
                {
                  type: 'view',
                  name: '手抄圣号',
                  url: 'https://wx.zizaihome.com/op/buddhaSpreadIndex',
                },
              ],
            },
            {
              name: '联系我们',
              sub_button: [
                {
                  type: 'view',
                  name: '了解我们',
                  url:
                    'https://wx.zizaihome.com/article/articleIndex?templeId=5591&articleId=3915',
                },
              ],
            },
            {
              name: '自在好物',
              sub_button: [
                {
                  type: 'view',
                  name: '甘露丸',
                  url:
                    'https://wx.zizaihome.com/commodity/commodityAuth?commodityId=10883&p_mc=gongzh_caid_ganluw_210601',
                },
                {
                  type: 'view',
                  name: '招财钱母',
                  url:
                    'https://wx.zizaihome.com/commodity/commodityAuth?commodityId=10341&p_mc=gongzh_caid_qianmu_210601',
                },
                {
                  type: 'view',
                  name: '转运红绳',
                  url:
                    'https://wx.zizaihome.com/commodity/commodityAuth?commodityId=10186&p_mc=gongzh_caid_zhuanyunhongsheng_210607',
                },
                {
                  type: 'view',
                  name: '免费结缘',
                  url:
                    'https://wx.zizaihome.com/op/topic/tqxn?p_mc=gongzh_zizaihaowuzt_210601',
                },
              ],
            },
          ],
        },
      },
      ruleId: 0,
    },
    {
      id: 3,
      name: '自定义1',
      type: 1,
      menuJson: {
        menu: {
          button: [
            {
              name: '1',
              sub_button: [],
            },
          ],
        },
      },
      ruleId: 11,
    },
  ],
};

export const del = {
  msg: '',
  errorCode: 0,
};

export const sync = {
  msg: '',
  errorCode: 0,
};

export const ruleList = {
  msg: '',
  errorCode: 0,
  data: [
    {
      id: 1,
      userType: 2,
      provinceJson: '',
      cityJson: '',
      registerTime: -1,
      ruleJson: [
        {
          days: 2,
          symbol: 1,
          ruleName: 'startApp',
        },
      ],
      name: '小易测试',
      addTime: '2019-12-30 11:07',
      status: 0,
      ruleType: 1,
      total: 0,
      wxtagId: 0,
      count: 0,
      downloadUrl: '/oprule/downloadExcel?ruleId=11',
    },
    {
      id: 2,
      userType: 1,
      provinceJson: {
        symbol: 1,
        province: '广东省,北京市',
      },
      cityJson: '',
      registerTime: -1,
      ruleJson: [],
      name: '用户分群微信端测试',
      addTime: '2020-01-08 14:00',
      status: 0,
      ruleType: 1,
      total: 0,
      wxtagId: 0,
      count: 0,
      downloadUrl: '/oprule/downloadExcel?ruleId=12',
    },
    {
      id: 3,
      userType: 2,
      provinceJson: '',
      cityJson: '',
      registerTime: -1,
      ruleJson: [],
      name: '用户分群APP端测试',
      addTime: '2020-01-08 14:03',
      status: 0,
      ruleType: 2,
      total: 0,
      wxtagId: 0,
      count: 0,
      downloadUrl: '/oprule/downloadExcel?ruleId=13',
    },
    {
      id: 4,
      userType: 0,
      provinceJson: '',
      cityJson: '',
      registerTime: -1,
      ruleJson: [],
      name: '2345',
      addTime: '2020-05-08 11:31',
      status: 0,
      ruleType: 0,
      total: 0,
      wxtagId: 0,
      count: 0,
      downloadUrl: '/oprule/downloadExcel?ruleId=14',
    },
    {
      id: 5,
      userType: 0,
      provinceJson: '',
      cityJson: '',
      registerTime: -1,
      ruleJson: [
        {
          days: 10,
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
      ],
      name: '12341',
      addTime: '2020-05-08 18:26',
      status: 0,
      ruleType: 2,
      total: 0,
      wxtagId: 0,
      count: 0,
      downloadUrl: '/oprule/downloadExcel?ruleId=16',
    },
    {
      id: 6,
      userType: 0,
      provinceJson: '',
      cityJson: '',
      registerTime: -1,
      ruleJson: [],
      name: '藏传佛事消费用户>=10元',
      addTime: '2021-03-29 18:05',
      status: 0,
      ruleType: 1,
      total: 3587,
      wxtagId: 0,
      count: 3587,
      downloadUrl: '/oprule/downloadExcel?ruleId=18',
    },
    {
      id: 7,
      userType: 2,
      provinceJson: '',
      cityJson: '',
      registerTime: -1,
      ruleJson: [],
      name: 'APP后端在测试',
      addTime: '2020-01-08 14:03',
      status: 0,
      ruleType: 2,
      total: 0,
      wxtagId: 0,
      count: 0,
      downloadUrl: '/oprule/downloadExcel?ruleId=19',
    },
  ],
};
