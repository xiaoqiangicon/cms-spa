export default {
  errorCode: 0,
  msg: '',
  pageNumber: -1,
  count: 100,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    name: '测试机随缘寺院转单测试',
    isAutoConversion: Math.floor(Math.random() * 2),
    buyNum: 12,
    orderId: 123,
    orderNo: 21312,
    posiscript: [
      {
        pic_url:
          'https://pic.zizaihome.com/0e951ec8-9eb6-11e7-959c-00163e0c1e1c.png',
        posiscript: [
          {
            name: '联系人',
            value: '麦一',
            type: 4,
            inputId: 46368,
          },
        ],
        subdirideId: 2798,
        subdirideName: '邮寄佛事1',
      },
      {
        pic_url:
          'https://pic.zizaihome.com/0e951ec8-9eb6-11e7-959c-00163e0c1e1c.png',
        posiscript: [
          {
            name: '联系人',
            value: '麦一',
            type: 4,
            inputId: 46368,
          },
        ],
        subdirideId: 2798,
        subdirideName: '邮寄佛事1',
      },
    ],
    price: 10,
    subdivideId: 1,
    subdivideName: '123123132',
    wxTransactionId: '213123213',
    conversionOrder: [
      {
        addTime: '2019-03-21 15:35:51',
        conversionOrderPrice: 2,
        disposePicUrl:
          'https://pic.zizaihome.com/7a5c12da-f921-11e8-aae1-00163e0c1e1c.jpg,https://pic.zizaihome.com/eac0e57ad4948a82980701d6bf803a8c.jpg',
        isFinish: Math.floor(Math.random() * 2),
        disposeVideoUrl:
          'https://pic.zizaihome.com/7fd190efef910bfaf44b77f6cf64ffda.mp4',
        posiscript: [
          // { name: '联系人', value: '麦一', type: 4, inputId: 46368 },
        ],
        templeName: '弘法寺',
      },
      {
        addTime: '2019-03-21 15:35:52',
        conversionOrderPrice: 21,
        disposePicUrl: '',
        disposeVideoUrl:
          'https://pic.zizaihome.com/7fd190efef910bfaf44b77f6cf64ffda.mp4,',
        isFinish: Math.floor(Math.random() * 2),
        posiscript: [
          { name: '联系人', value: '麦一', type: 4, inputId: 46368 },
        ],
        templeName: '弘法寺1',
      },
    ],
  })),
};
