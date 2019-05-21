export default {
  errorCode: 0,
  msg: '',
  data: [1,2,3,4,5,6,7,8,9,10].map(id => ({
    id,
    isManager: Math.floor(Math.random()*2),
    nickName: `昵称${id}`,
    headImg: `../../../../sample/image1.jpg`,
  }))
};
