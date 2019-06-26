export default {
  errorCode: 0,
  msg: '',
  data: {
    bgColor: 'red',
    btnBgColor: 'green',
    textColor: 'blue',
    title: '页面标题',
    introduce:
      '简介描述简介描述简介描述简介描述简介描述简介描述简介描述简介描述简介描述简介描述简介描述简介描述简介描述简介描述简介描述简介描述简介描述',
    coverPic: '../../../../sample/image3.jpg',
    templeComponent: {
      templeTitle: '寺院组件名',
      templeList: [1, 2, 3, 4, 5, 6].map(inx => ({
        id: inx,
        name: `寺院${inx}`,
        pic: '../../../../sample/image2.jpg',
        url: '',
      })),
    },
    commodityComponent: {
      commodityTitle: '佛事组件名',
      commodityList: [1, 2, 3, 4, 5, 6].map(inx => ({
        id: inx,
        pic: '../../../../sample/image2.jpg',
        name: `佛事佛事佛事佛事佛事${inx}`,
        join_num: inx,
        url: '',
      })),
    },
    goodsComponent: {
      goodsTitle: '商品组件名',
      goodsList: [1, 2, 3, 4, 5].map(inx => ({
        id: inx,
        pic: '../../../../sample/image2.jpg',
        name: `商品${inx}`,
        price: '￥100 -￥300',
        url: '',
      })),
    },
    isShowWish: !0,
  },
};
