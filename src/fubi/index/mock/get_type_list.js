export default {
  errorCode: 0,
  msg: '',
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    name: `类型名称${id}`,
    sort: `${id}`,
  }))
};
