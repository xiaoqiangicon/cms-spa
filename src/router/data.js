import cookie from 'js-cookie';
import { urlParams } from '@zzh/n-util';

const subDomain = window.location.hostname.split('.')[0];

export const domain =
  subDomain === 'cms'
    ? 'http://cms.miaoyan.org'
    : 'http://gstest.zizaihome.com';

const isLocal = subDomain.indexOf('localhost') > -1;
const isSuper = !!urlParams.super;

export const valid = item =>
  isLocal ||
  isSuper ||
  !item.controlMark ||
  !!parseInt(cookie.get(item.controlMark), 10);
