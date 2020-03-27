export const list = {
  success: !0,
  totalCount: 99,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    date: `2019-01-${id + 10}`,
    type: Math.floor(Math.random() * 2) + 1,
    amount: id * 100,
    nickname: `用户 ${id}`,
    avatar: `/images/logo.png`,
    phone: '12312312312',
    send: Math.floor(Math.random() * 2),
  })),
};

export const list1 = {
  errorCode: 0,
  data: {
    count: 99,
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
      id,
      giftDate: `2019-01-${id + 10}`,
      type: Math.floor(Math.random() * 2) + 1,
      telMoney: id * 100,
      nickName: `用户 ${id}`,
      headImg: `/images/logo.png`,
      phone: '12312312312',
      status: Math.floor(Math.random() * 2),
    })),
  },
};

export const send = { success: !0 };
export const send1 = { errorCode: 0 };
