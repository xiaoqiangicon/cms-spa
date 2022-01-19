export const getContent = {
  msg: '成功',
  errorCode: 0,
  data: {
    list: [
      {
        name: '名字',
        id: 10, //子项Id
        pruchasing_id: 1, //项目Id
        expressNo: 'YT12039120', //快递单号
        expressName: '圆通快递',
        templeId: 1, //寺院Id，>0表示有入驻,0表示未入驻
        templeName: '寺院名', //寺院名
        usePlace: '用途', //有值说明选的是用途
        receiverName: '收件人',
        receiverPhone: '13800138000', //收件人电话
        receiverAddress: '收件地址',
        platform: '拼多多', //采购的平台名
        purchasingList: [
          {
            name: '物品名称',
            money: 100.0,
            num: 10,
            unit: '盒',
          },
          {
            name: '物品名称',
            money: 100.0,
            num: 10,
            unit: '盒',
          },
          {
            name: '其他费用-快递费',
            money: 10.0,
            num: 0,
            unit: '盒',
          },
        ],
        totalItem: 100, //物品数
        totalMoney: 10000, //单位分
        expressPath: [
          {
            //物流情况
            ftime: '2021-12-22 04:30:43',
            context: '【杭州转运中心】 已发出 下一站 【深圳转运中心公司】',
          },
          {
            ftime: '2021-12-22 04:29:07',
            context: '【杭州转运中心公司】 已收入',
          },
          {
            ftime: '2021-12-21 20:27:59',
            context: '【嘉兴转运中心】 已发出',
          },
          {
            ftime: '2021-12-21 19:37:59',
            context: '【嘉兴转运中心公司】 已收入',
          },
          {
            ftime: '2021-12-21 18:45:49',
            context:
              '【浙江省嘉兴市桐乡市】 已发出 下一站 【嘉兴转运中心公司】',
          },
          {
            ftime: '2021-12-21 18:41:41',
            context: '【浙江省嘉兴市桐乡市公司】 已打包',
          },
          {
            ftime: '2021-12-21 18:41:36',
            context:
              '【浙江省嘉兴市桐乡市公司】 已揽收 取件人: 程家圆 (0573-88929293)',
          },
          {
            ftime: '2021-12-21 17:57:12',
            context: '【浙江省嘉兴市桐乡市公司】 已收入',
          },
          {
            ftime: '2021-12-21 16:57:42',
            context:
              '【浙江省嘉兴市桐乡市乌镇公司】 已揽收 取件人: 李东保 (18521802779)',
          },
        ],
        expressUpdate: '2021-01-01 12:00', //物流信息最后更新时间
        expressStatus: 0, //0到达，>0未到达
        addTime: '2021-01-01 12:00', //添加时间
        comCode: 'yuantong', //快递100 快递公司编码
        isFinish: 1,
        platformOrderNo: '1347913842934', //采购平台的订单号
      },
    ],
  },
};

export const checkExpressNo = {
  msg: '成功',
  errorCode: 0,
  data: {
    lengthPre: 15,
    comCode: 'yuantong',
    name: '圆通速递',
  },
};

export const delContent = {
  msg: '成功',
  errorCode: 0,
};

export const editContent = {
  msg: '成功',
  errorCode: 0,
  data: {
    id: 1,
  },
};

export const templeList = {
  errorCode: 0,
  data: [
    {
      id: 1,
      temple_name: '深圳弘法寺(测试)',
    },
    {
      id: 2,
      temple_name: '深圳弘法寺(测试)2',
    },
  ],
};
