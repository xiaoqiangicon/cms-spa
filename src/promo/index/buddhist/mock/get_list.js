export default {
  errorCode: 0,
  msg: '',
  data: {
    count: 1000,
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
      commodityId: id,
      commodityName: `佛事囧却无法奇偶发无法减为偶发${id}`,
      templeId: id,
      templeName: `寺院${id}`,
      isEnd: Math.floor(Math.random()*2),
      isFinish: Math.floor(Math.random()*2),
      isShareBlessCoin: Math.floor(Math.random()*2),
      isPromotion: Math.floor(Math.random()*2),
      managerName: `用户${id}`,
      rate: 0.12,
      startTime: '2020-12-18 18:20:47',
      updateTime: '2019-12-18 18:20:47',
      subdivideList: [
        {name: '选择项1', price: 11, shareBlessCoinPercentage: 11},
        {name: '选择项2', price: 12, shareBlessCoinPercentage: 12},
        {name: '选择项3', price: 13, shareBlessCoinPercentage: 13},
      ],
    })),
  }
};
