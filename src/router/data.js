import cookie from 'js-cookie';
import { urlParams } from '../../../pro-com/src/utils';

const subDomain = window.location.hostname.split('.')[0];

export const domain =
  subDomain === 'cms'
    ? 'http://cms.miaoyan.org'
    : 'http://gstest.zizaihome.com';

const isLocal = subDomain.indexOf('localhost') > -1;
const isSuper = !!urlParams.super;

// 第三方账户，默认没有权限的，也不展示
const isThirdParty = parseInt(cookie.get('loginType'), 10) === 10;

export const valid = (item, parent) => {
  if (
    parent &&
    isThirdParty &&
    !parent.controlMark &&
    !item.controlMark &&
    !item.hidden
  )
    return !1;

  let cMark = 0;
  if (item.controlMark) {
    if (Array.isArray(item.controlMark)) {
      // eslint-disable-next-line
      for (let x = 0; x < item.controlMark.length; x++) {
        if (parseInt(cookie.get(item.controlMark[x]), 10)) {
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
