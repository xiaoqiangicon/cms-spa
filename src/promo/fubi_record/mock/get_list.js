export default {
  errorCode: 0,
  msg: '',
  data: {
    count: 1000,
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
      id,
      addTime: `${new Date()}`,
      name: `名称${id}`,
      payMoney: Math.ceil(Math.random()*1000),
      owner: `拥有者${id}`,
      fuBiMoney: Math.ceil(Math.random()*1000),
    })),
  }
};
