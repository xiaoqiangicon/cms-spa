export const list = {
  msg: '成功',
  errorCode: 0,
  data: {
    total: 100,
    pageNo: 1,
    list: '.'
      .repeat(20)
      .split('')
      .map((d, i) => ({
        id: i + 1,
        name: '寺院名' + i,
        headImg: '/images/logo.png', //寺院头像
        content: '进展内容'.repeat(10),
        pic:
          '/sample/image1.jpg,/sample/image2.jpg,/sample/image3.jpg,/sample/image4.jpg', //多张用逗号隔开
        num: 1000 + i, //装藏数
        isFinish: i % 2, //1已装藏，0未装藏
      })),
  },
};
export const edit = {
  msg: '成功',
  errorCode: 0,
};
export const finish = {
  msg: '成功',
  errorCode: 0,
};
export const del = {
  msg: '成功',
  errorCode: 0,
};
