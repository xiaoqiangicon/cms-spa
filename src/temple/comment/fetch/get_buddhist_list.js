import seeFetch from 'see-fetch';

seeFetch.config('temple/comment/getBuddhistList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/temple/getCommodityList',
    '/src/temple/comment/mock/get_commodity_name_list',
    '/src/temple/comment/mock/get_commodity_name_list',
  ],
});
