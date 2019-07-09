const arr = new Array(20).fill(1).map((item, index) => index + 1);

export default {
  errorCode: 0,
  msg: '',
  data: {
    count: arr.length,
    list: arr.map(id => ({
      id,
      title: `标题${id}`,
      subtitle: `副标题${id}`,
      userNum: `${id}`,
      productNum: `产品编号${id}`,
      addTime: `添加时间${id}`,
      // 详情信息
      images:
        '../../../../../sample/image1.jpg,../../../../../sample/image2.jpg,../../../../../sample/image3.jpg',
      remark: '123123',
      orderInfo: [
        { id: 123, nickname: 'dsd', fangMing: '123', tel: '123213', num: 12 },
      ],
    })),
  },
};
