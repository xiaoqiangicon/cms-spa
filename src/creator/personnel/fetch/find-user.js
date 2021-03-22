/* eslint-disable no-param-reassign, prefer-destructuring, no-nested-ternary */
import seeFetch from 'see-fetch';

seeFetch.config('creator/personnel/findPerson', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/video/findUser',
    '/creator/personnel/mock/findPerson',
    '/creator/personnel/mock/findPerson',
  ],
});
