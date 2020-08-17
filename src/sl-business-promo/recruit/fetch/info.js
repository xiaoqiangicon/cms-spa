/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

const refactor = {
  data: {
    // 是否招募
    recruit: 'isRecruit',
    // 是否审核
    verify: 'examineSeller',
    // 标题
    title: 'recruitTitle',
    // 介绍
    intro: 'recruitDetail',
  },
};

seeFetch.config('sl-business-promo/recruit/info', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/cooperation/getBusinessUserMessage',
    '/sl-business-promo/recruit/mock/infoS',
    '/sl-business-promo/recruit/mock/info',
  ],
  refactor: [refactor, refactor],
});
