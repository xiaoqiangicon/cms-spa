/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

const req = {
  jsonContent: 'articleJson',
  region: 'area',
  publishAccount: 'pushAccount',
  covers: 'titleImg',
  publishTime: 'printTime',
  publishAuthor: 'printAuthor',
  original: 'isOriginal',
};

const pre = params => {
  if (params.publish) params.status = 1;
  else params.status = 0;

  delete params.publish;
};

seeFetch.config('qu/material/add', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/funtop/updateUseArticle',
    '/qu/material/mock/add1',
    '/qu/material/mock/add',
  ],
  req: [req, req],
  pre: [pre, pre],
});
