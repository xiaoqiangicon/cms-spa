export default {
  errorCode: 0,
  msg: '',
  data: {
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map(
      id => ({
        id,
        name: `商品名称${id}`,
        price: 10 * id,
      })
    ),
  },
};
