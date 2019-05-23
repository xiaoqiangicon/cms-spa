/* eslint-disable no-param-reassign */
import seeFetch from 'see-fetch';

seeFetch.config('finance/taking/info', {
  method: ['post'],
  stringify: [!0],
  url: ['', '/finance/taking/mock/info1', '/finance/taking/mock/info'],
  implement: [
    () =>
      new Promise(resolve => {
        const item = window.sessionStorage['finance/taking||item'];

        if (!item) {
          resolve({
            errorCode: -1,
            msg: '页面已过期',
          });
        } else {
          resolve({
            errorCode: 0,
            data: JSON.parse(item),
          });
        }
      }),
  ],
});
