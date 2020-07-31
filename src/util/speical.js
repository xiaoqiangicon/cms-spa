import { urlParams } from '../../../pro-com/src/utils';

export const getAccessRoutes = (routes, permissionInfo) => {
  /* eslint-disable no-param-reassign */
  const isLocal = window.location.hostname.indexOf('localhost') > -1;

  const valid = item => {
    // 如果没有组件，就添加一个域名
    if (!item.component) {
      item.path = window.location.origin + item.path;
    }

    // 本地，全放开
    if (isLocal) return !0;
    // 超级用户，全放开
    if (permissionInfo.super || urlParams['fake-super']) return !0;

    return permissionInfo.names && permissionInfo.names.indexOf(item.name) > -1;
  };

  const tmp = routes;

  tmp.forEach(item => {
    const { children } = item;
    item.children = children.filter(child => valid(child));
  });

  return tmp.filter(item => item.children && item.children.length);
};
