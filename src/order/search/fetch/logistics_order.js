import seeFetch from 'see-fetch';
var orderTypeTexts = ['微信', 'APP'];
var statusTexts = ['未处理', '已处理'];
var requestKeys = {};
var responseRefactor = {
  data: [
    {
      orderId: 'orderNo',
      orderType: 'isChanzai',
      money: 'price',
      orderTime: 'payTime',
      status: 'isFinish',
      isTransfer: 'isConversionOrder',
      transferTo: 'conversionOrderStr',
      selectItem: 'subdivideName',
      count: 'num',
      prayType: 'buddhaWallType',
      placeSequence: 'place',
      flowId: 'wxTransactionId',
      contactName: 'userName',
      contactPhone: 'mobile',
      feedImages: 'disposePicUrl',
    },
  ],
};
var postHandle = function(res) {
  if (res.data && res.data.length) {
    res.data.forEach(function(item, index) {
      item.id = index + 1;
      item.orderTypeText = orderTypeTexts[item.orderType];
      item.isChanzaiText = item.isChanzai ? '是' : '否';
      item.statusText = statusTexts[item.status];

      if (item.disposePicUrl) {
        item.disposePicUrl = item.disposePicUrl.split(',');
      } else {
        item.disposePicUrl = [];
      }
      if (item.disposeVideoUrl) {
        item.disposeVideoUrl = item.disposeVideoUrl.split(',');
      } else {
        item.disposeVideoUrl = [];
      }
    });
  }
};

seeFetch.config('order/search/logisticsOrder', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/order/searchOrderByLogisticsOrder',
    '/src/order_manage/search_order/mock/logistics_order_server.json',
    '/src/order_manage/search_order/mock/logistics_order.json',
  ],
  responseRefactor: [responseRefactor, responseRefactor],
  postHandle: [postHandle, postHandle],
});
