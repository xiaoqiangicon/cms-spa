/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';

const req = {
  content: 'details',
  startDate: 'startTime',
  endDate: 'endTime',
  priority: 'top',
};

seeFetch.config('ling/fate/update', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/wish/addOrUpdateStarStrategy',
    '/ling/fate/mock/update1',
    '/ling/fate/mock/update',
  ],
  req: [req, req],
});
