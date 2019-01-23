export const list = {
  success: true,
  totalCount: 99,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    cover: `/sample/image${Math.floor(Math.random() * 3) + 1}.jpg`,
    title: `标题标题标题标题 ${id}`,
    nickname: `昵称 ${id}`,
    exchangeTime: '2018-01-01 01:01:01',
    expressType: Math.floor(Math.random() * 3),
    expressCompany: `快递公司 ${id}`,
    expressOrder: `快递单号 ${id}`,
    name: `用户 ${id}`,
    address: `地址 ${id}`,
    phone: '12312312312',
  })),
};

export const list1 = {
  errorCode: 0,
  data: {
    count: 99,
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
      id,
      giftPic: '/sample/image1.jpg,/sample/image2.jpg,/sample/image3.jpg',
      giftName: `标题标题标题标题 ${id}`,
      nickName: `昵称 ${id}`,
      addTime: '2018-01-01 01:01:01',
      isReal: Math.floor(Math.random() * 3),
      deliveryCompany: `快递公司 ${id}`,
      deliveryNumber: `快递单号 ${id}`,
      name: `用户 ${id}`,
      address: `地址 ${id}`,
      tel: '12312312312',
    })),
  },
};

export const handle = { success: !0 };

export const handle1 = { errorCode: 0 };
