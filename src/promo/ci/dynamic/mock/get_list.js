const arr = new Array(20).fill(1).map((item, index) => index + 1);

export default {
  errorCode: 0,
  msg: '',
  data: {
    count: arr.length,
    list: arr.map(id => ({
      id,
      content: '内容文本',
      images:
        '../../../../../sample/image1.jpg,../../../../../sample/image2.jpg',
      ifPush: !1,
      addTime: '事件',
    })),
  },
};
