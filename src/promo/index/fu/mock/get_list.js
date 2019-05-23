export default {
  errorCode: 0,
  msg: '',
  data: {
    count: 1000,
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
      id,
      sort: id,
      buddhistName: `佛事${id}`,
      templeName: `寺院${id}`,
      orderNum: Math.ceil(Math.random()*1000),
      sharePay: Math.ceil(Math.random()*1000),
      fuBiMoney: Math.ceil(Math.random()*1000),
      type: Math.floor(Math.random()*2),
    })),
  }
};
