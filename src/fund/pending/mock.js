export const list = {
  errorCode: 0,
  data: {
    total: 10,
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
      id,
      addTime: '2017-01-01 01:01:01',
      name: `name${id}`,
      userId: id * 10,
      price: id * 100 + 1,
      status: id % 3 === 2 ? 3 : id % 3,
    })),
  },
};

export const getPickUpMessage = {
  msg: '',
  errorCode: 0,
  data: {
    user: {
      id: 1644,
      name: '测试',
      userId: 1000844050,
      bonzeId: 0,
      status: 0,
      addTime: '09-07 19:42:43',
      idCard: '12345678901',
      bankCard: '12345678901',
      bank: '测试',
      underBank: '测试',
      cardImgFront: '/sample/image1.jpg',
      cardImgBack: '/sample/image2.jpg',
      allowSuixi: 1,
      allowShopWindow: 1,
    },
    list: [
      {
        id: 1,
        price: 1000,
        billId: 1,
        calculationTime: '09-01 00:00:00',
        addTime: '09-07 19:56:54',
        updateTime: '09-08 15:06:44',
        pickUpId: 1,
        status: 0,
      },
    ],
    feedbackPic: 'test.jpg',
    content: '拒绝原因',
    status: 0,
  },
};

export const updatePickUp = {
  msg: '',
  errorCode: 0,
  data: '',
};

export const personList = {
  msg: '',
  errorCode: 0,
  data: [
    {
      searchName: '61255-李强-昵称昵称',
      id: 1,
    },
  ],
};
