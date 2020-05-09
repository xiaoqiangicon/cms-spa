import seeFetch from 'see-fetch';

const post = res => {
  res.data.forEach((item, key) => {
    if (item.isAutoConversion) {
      item.isAutoConversion = '自动';
    } else {
      item.isAutoConversion = '手动';
    }
    item.id = key + 1;

    item.conversionOrder.forEach(subItem => {
      if (subItem.isFinish === 0) {
        subItem.isFinish = '处理中';
      } else {
        subItem.isFinish = '已处理';
      }
    });

    // 多于1的时候以树状形式展开，增加children字段
    if (item.conversionOrder.length > 1) {
      item.children = [];

      item.conversionOrder.forEach((subItem, subKey) => {
        if (subKey > 0) {
          const single = {};
          single.isFinish = subItem.isFinish;
          single.templeName = subItem.templeName;
          single.conversionOrderPrice = subItem.conversionOrderPrice;
          single.conversionSubdivideName = subItem.subdivideName;
          single.orderNo = item.orderNo;
          if (key < 10) {
            single.id = parseInt(`${key + 1}${subKey}`);
          } else {
            single.id = key + subKey;
          }
          item.children.push(single);
        }
      });
    }

    item.isFinish = item.conversionOrder[0].isFinish;
    item.templeName = item.conversionOrder[0].templeName;
    item.conversionOrderPrice = item.conversionOrder[0].conversionOrderPrice;
    item.conversionSubdivideName = item.conversionOrder[0].subdivideName;
  });
  // res.data[0].temple = [1, 2, 3, 4]
};

seeFetch.config('promo/index/transferNotDispose/getTransferNotDisposeList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/conversionOrder/getNotDisposeConversionOrderList',
    '/promo/index/transferNotDispose/mock/get_transfer_not_dispose_list',
    '/promo/index/transferNotDispose/mock/get_transfer_not_dispose_list',
  ],
  post: [post, post, post],
});
