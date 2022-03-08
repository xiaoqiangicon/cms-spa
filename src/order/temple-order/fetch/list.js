import seeFetch from 'see-fetch';

const post = res => {
  if (res.data && res.data.list) {
    res.data.list.forEach(item => {
      item.urgeText = item.urgeOrder ? '已催单' : '未催过';
    });
  }
};

seeFetch.config('order/templeOrder/list', {
  method: ['post'],
  stringify: [true],
  url: [
    '/order/comodityOrderList',
    '/src/order/temple-order/mock/list',
    '/src/order/temple-order/mock/list',
  ],
  post: [post, post, post],
});
