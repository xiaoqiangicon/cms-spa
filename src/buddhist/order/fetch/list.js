/* eslint-disable no-param-reassign, prefer-destructuring, no-nested-ternary */
import seeFetch from 'see-fetch';

const post = res => {
  if (res.data && res.data.list) {
    res.data.list.forEach(item => {
      item.reason =
        '上传的图片模糊或者不清晰，请尝试上传高清图片，上传图片数量应>=2张，拍照建议：需能够清晰看出寺院环境、以及供奉佛像牌位内容等信息。';
      item.pics = item.dispose_pic_url ? item.dispose_pic_url.split(',') : [];
      item.payWay = item.is_chanzai_pay ? 'APP支付' : 'SAAS支付';
    });
  }
};

seeFetch.config('buddhist/order/list', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/order/getFeedbackOrderList',
    '/buddhist/order/mock/list',
    '/buddhist/order/mock/list',
  ],
  post: [post, post, post],
});
