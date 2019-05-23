/* eslint-disable no-param-reassign, prefer-destructuring, no-nested-ternary */
import seeFetch from 'see-fetch';

const req = {
  id: 'pickUpId',
  content: 'answer',
};

seeFetch.config('finance/taking/answer', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/finance/answerPickUp',
    '/finance/taking/mock/answer1',
    '/finance/taking/mock/answer',
  ],
  req: [req, req],
});
