export default {
  errorCode: 0,
  msg: '',
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    name: `寺院名称${id}`,
    "subdivides": [
      {
        "subdivideName": "普通佛事",
        "id": 2911,
        "price": 100,
        "isConversion": 0,
        "conversionSubdivide": 0,
        "isZizaijiaCommodity": 1,
        "isOrder": 1
      },
      {
        "subdivideName": "往生牌位",
        "id": 2912,
        "price": 200,
        "isConversion": 0,
        "conversionSubdivide": 0,
        "isZizaijiaCommodity": 1,
        "isOrder": 0
      },
      {
        "subdivideName": "祈福牌位",
        "id": 2913,
        "price": 500,
        "isConversion": 0,
        "conversionSubdivide": 0,
        "isZizaijiaCommodity": 1,
        "isOrder": 0
      },
      {
        "subdivideName": "邮寄佛事",
        "id": 2914,
        "price": 1000,
        "isConversion": 0,
        "conversionSubdivide": 0,
        "isZizaijiaCommodity": 1,
        "isOrder": 0
      },
      {
        "subdivideName": "普通佛事随喜",
        "id": 2915,
        "price": -1,
        "isConversion": 0,
        "conversionSubdivide": 0,
        "isZizaijiaCommodity": 1,
        "isOrder": 0
      },
      {
        "subdivideName": "无需支付",
        "id": 2916,
        "price": 0,
        "isConversion": 0,
        "conversionSubdivide": 0,
        "isZizaijiaCommodity": 1,
        "isOrder": 0
      }
    ]
  })),
};
