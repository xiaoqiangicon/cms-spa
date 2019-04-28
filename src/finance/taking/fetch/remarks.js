/* eslint-disable no-param-reassign, prefer-destructuring, no-nested-ternary */
import seeFetch from 'see-fetch';

const pre = params => ({ ...params, status: 1 });

const refactor = {
  data: [
    {
      content: 'title',
      takeEffect: 'status',
    },
  ],
};

seeFetch.config('finance/taking/remarks', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/cashMemo/list',
    '/finance/taking/mock/remarks1',
    '/finance/taking/mock/remarks',
  ],
  req: [pre, pre],
  refactor: [refactor, refactor],
});
