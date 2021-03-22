import seeFetch from 'see-fetch';

const post = res => {
  let areaList = res.data.split(',');
  // areaList.forEach((item, key) => {
  //   let obj = {};
  //   obj.name = item;
  //   obj.id = item;
  //   areaList[key] = obj;
  // })
  res.areaList = areaList;
};

seeFetch.config('temple/super/getArea', {
  method: ['get'],
  stringify: [!0],
  url: [
    '/temple/getArea',
    '/temple/super/mock/getArea',
    '/temple/super/mock/getArea',
  ],
  post: [post, post, post],
});
