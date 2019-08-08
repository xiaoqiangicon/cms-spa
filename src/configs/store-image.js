/* eslint-disable import/prefer-default-export */
import seeFetch from 'see-fetch';

const implement = (cb, reqData) => {
  cb({ url: `__new__${reqData.url.slice(2, -2)}__new__` });
};

seeFetch.config('global-store-image', {
  settings: [
    {
      timeout: 30000,
    },
  ],
  method: ['post'],
  stringify: [!0],
  url: ['/uploadUrl'],
  implement: [undefined, implement, implement, implement, implement],
});

export const makeOptions = ({ content, done, progress }) => ({
  content,
  done,
  progress,
  doSave(url, success, error) {
    seeFetch('global-store-image', { url })
      .then(res => {
        if (!res || !res.data || !res.data.pic) {
          if (error) error();
        } else if (success) success(res.data.pic);
      })
      .catch(() => {
        if (error) error();
      });
  },
});
