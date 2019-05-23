export default {
  errorCode: 0,
  msg: '',
  count: 100,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    name: `寺院${id}`,
    profitConversionOrderPrice: 1000,
    conversionOrderPrice: 2000,
    conversionOrderNum: 3000,
  })),
};
