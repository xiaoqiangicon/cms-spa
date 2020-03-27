import cookie from 'js-cookie';
import { isArray } from '../util/index';
import { urlParams } from '../../../pro-com/src/utils';

const subDomain = window.location.hostname.split('.')[0];

export const domain =
  subDomain === 'cms'
    ? 'http://cms.miaoyan.org'
    : 'http://gstest.zizaihome.com';

const isLocal = subDomain.indexOf('localhost') > -1;
const isSuper = !!urlParams.super;

export const valid = item => {
  let cMark = 0;
  if (item.controlMark) {
    if (isArray(item.controlMark)) {
      for (let x = 0; x < item.controlMark.length; x++) {
        if (parseInt(cookie.get(item.controlMark[x]), 10) === 1) {
          cMark = 1;
          break;
        }
      }
    } else {
      cMark = parseInt(cookie.get(item.controlMark), 10);
    }
  }
  return isLocal || isSuper || !item.controlMark || cMark;
};
