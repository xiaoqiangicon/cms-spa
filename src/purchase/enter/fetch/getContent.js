/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

let expressText = ['已签收', '未签收'];

const post = res => {
  res.data.list &&
    res.data.list.forEach(item => {
      item.expressStatusText = item.expressStatus === 0 ? '已签收' : '未签收';
      item.registerTempleTest = item.usePlace
        ? '执行用途'
        : item.templeId > 0
        ? '入驻寺院'
        : '未入驻寺院';
    });
};

seeFetch.config('purchase/enter/getContent', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/purchasing/projectContent',
    '/purchase/enter/mock/getContent',
    '/purchase/enter/mock/getContent',
  ],
  post: [post, post, post],
});
