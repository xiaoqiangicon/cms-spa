/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

const req = {
  // 是否招募
  recruit: 'isRecruit',
  // 是否审核
  verify: 'examineSeller',
  // 标题
  title: 'recruitTitle',
  // 介绍
  intro: 'recruitDetail',
};

seeFetch.config('sl-business-promo/recruit/save', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/cooperation/updateRecruitSetting',
    '/sl-business-promo/recruit/mock/saveS',
    '/sl-business-promo/recruit/mock/save',
  ],
  req: [req, req],
});
