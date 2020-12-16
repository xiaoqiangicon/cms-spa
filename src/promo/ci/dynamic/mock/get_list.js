const arr = new Array(20).fill(1).map((item, index) => index + 1);

export default {
  errorCode: 0,
  msg: '',
  data: {
    count: arr.length,
    list: arr.map(id => ({
      id,
      content: '内容文本',
      img: '../../../../../sample/image1.jpg,../../../../../sample/image2.jpg',
      video:
        'https://pic.zizaihome.com/6e33a93e-8457-4e9c-8dd1-62e993c7ca83.mp4',
      isPush: !1,
      hasPush: !0,
      addTime: new Date(1999),
    })),
  },
};
