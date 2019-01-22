import request from 'reqwest';

let uploadUrl = '/uploadUrl';

if (window.location.hostname.indexOf('localhost') > -1) {
  uploadUrl = '/mock/upload-url.json';
}

window.storeImageSaveUrl = (url, success, error) => {
  request({
    url: uploadUrl,
    method: 'post',
    data: JSON.stringify({ url }),
    success: res => {
      if (!res || !res.data || !res.data.pic) {
        if (error) error();
      } else if (success) success(res.data.pic);
    },
    error: () => {
      if (error) error();
    },
  });
};
