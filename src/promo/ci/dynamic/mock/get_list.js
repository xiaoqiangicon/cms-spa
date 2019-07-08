const arr = new Array(20).fill(1).map((item, index) => index + 1);

export default {
  errorCode: 0,
  msg: '',
  data: {
    count: arr.length,
    list: arr.map(id => ({
      id,
      nickname: `昵称${id}`,
      info: `录入信息${id}`,
      tel: `电话${id}`,
      origin: `来源${id}`,
      addTime: `添加时间${id}`,
    })),
  },
};
