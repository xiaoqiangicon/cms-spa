import request from '@/utils/request';

export function fetchList(data) {
  return request({
    url: '/chaojing/list',
    method: 'post',
    data,
  });
}

export function updateItem(data) {
  return request({
    url: '/chaojing/edit',
    method: 'post',
    data,
  });
}

export function finishItem(data) {
  return request({
    url: '/chaojing/finish',
    method: 'post',
    data,
  });
}

export function delItem(data) {
  return request({
    url: '/chaojing/del',
    method: 'post',
    data,
  });
}
