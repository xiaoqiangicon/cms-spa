export default {
  errorCode: 0,
  msg: '',
  data: {
    total: 1000,
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
      id,
      payTime: `2019-02-12 12:21:21`,
      name: `名称${id}`,
      price: Math.ceil(Math.random()*1000),
      nickName: `拥有者${id}`,
      mobile: 1232312131,
      shareBlessCoin: Math.ceil(Math.random()*1000),
    })),
  }
};
