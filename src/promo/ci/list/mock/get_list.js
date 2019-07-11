const arr = new Array(20).fill(1).map((item, index) => index + 1);

export default {
  errorCode: 0,
  msg: '',
  data: {
    count: arr.length,
    list: arr.map(id => ({
      id,
      title: `标题${id}`,
      littleTitle: `副标题${id}`,
      feedbackProduce: `产品编号${id}`,
      addTime: `添加时间${id}`,
      // 详情信息
      feedbackImg:
        '../../../../../sample/image1.jpg,../../../../../sample/image2.jpg,../../../../../sample/image3.jpg',
      feedbackContent: '123123',
      userInfo: [
        {
          userId: 1,
          nickName: '哈哈1',
          name: '真实姓名1',
          phone: '231231',
          num: 1,
        },
        {
          userId: 2,
          nickName: '哈哈2',
          name: '真实姓名2',
          phone: '231232',
          num: 2,
        },
      ],
    })),
  },
};
