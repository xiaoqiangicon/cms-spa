export const addUrl = {
  msg: '成功',
  errorCode: 0,
};

export const delUrl = {
  msg: '成功',
  errorCode: 0,
};

export const editUrl = {
  msg: '成功',
  errorCode: 0,
};

export const getShortUrlPage = {
  msg: '成功',
  errorCode: 0,
  data: {
    total: 50,
    pageNo: 1,
    list: [
      {
        id: 10,
        title: '标题',
        type: 1,
        originUrl: 'https://baidu.com', //原url
        url: 'https://wx.zizaihome.com/u/FASD', //短连接url
        sms_url: 'https://u.miaoyan.net/u/FASD', //用于发短信的url
        createDate: '2022年5月5日',
        editLog: [
          {
            time: '2022-05-06 12:00:12',
            url: 'https://google.com',
            editor: '麦秋鸿',
          },
          {
            time: '2022-05-05 12:00:12',
            url: 'https://miaoyan.com',
            editor: '麦秋鸿',
          },
        ],
      },
    ],
  },
};
