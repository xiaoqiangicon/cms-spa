import seeFetch from 'see-fetch';

const post = res => {
  res.data.unshift({
    name: '全部',
    id: 0,
  });
  res.data.forEach(item => {
    item.value = item.name;
  });
};

seeFetch.config('promo/index/transferNotDispose/getCommodityList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/conversionOrder/conversionOrderCommodityGetAllList',
    '/promo/index/transferNotDispose/mock/get_commodity_list',
    '/promo/index/transferNotDispose/mock/get_commodity_list',
  ],
  post: [post, post, post],
});
