import seeFetch from 'see-fetch';
var orderTypeTexts = ['微信', 'APP'];
var statusTexts = ['未处理', '已处理'];

var postHandle = function(res) {
  res.data.orderList &&
    res.data.orderList.forEach(function(item, index) {
      item.id = index + 1;
      item.orderTypeText = orderTypeTexts[item.isChanzai];
      item.isChanzaiText = item.isChanzai ? '是' : '否';
      item.statusText = statusTexts[item.isFinish];
      // item.disposePicUrl && (item.disposePicUrl = item.disposePicUrl.split(','));

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
};
seeFetch.config('order/search/order', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/order/searchOrderByNumber',
    '/src/order/search/mock/list',
    '/src/order/search/mock/list',
  ],
  postHandle: [postHandle, postHandle],
});
