import cookie from 'js-cookie';

const subDomain = window.location.hostname.split('.')[0];

export const domain =
  subDomain === 'cms'
    ? 'http://cms.miaoyan.org'
    : 'http://gstest.zizaihome.com';

export const isLocal = subDomain.indexOf('localhost') > -1;

export const valid = item =>
  isLocal || !item.controlMark || !!parseInt(cookie.get(item.controlMark), 10);
