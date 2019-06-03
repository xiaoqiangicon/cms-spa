export default {
  errorCode: 0,
  msg: '',
  data: {
    total: 1000,
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
      id,
      sort: id,
      name: `名称${id}`,
      blessShopType: id,
      payBlessCoin: Math.ceil(Math.random()*1000),
      payBlessCoinCnt: Math.floor(Math.random()*20)
    })),
  }
};
