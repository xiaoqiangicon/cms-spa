const arr = new Array(20).fill(1).map((item, index) => index + 1);

export default {
  errorCode: 0,
  msg: '',
  data: {
    count: arr.length,
    list: arr.map(id => ({
      id,
      nickName: `昵称${id}`,
      name: `录入信息${id}`,
      phone: `电话${id}`,
      addTime: `添加时间${id}`,
      oldUser: 1,
    })),
  },
};
