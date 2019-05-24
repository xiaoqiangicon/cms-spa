// 本地测试环境
if (window.location.hostname.indexOf('localhost') > -1) {
  window.zzhUploadUrl = '/mock/upload.json';

  window.uploadBase64Url = '/mock/upload.json';
  window.uploadBase64Handle = res => res.data.pic;
} else {
  window.zzhUploadUrl = '/upload';

  window.uploadBase64Url = '/upload/picBase64';
  window.uploadBase64Handle = res => res.data.url;
}

window.zzhUploadHandle = res => res.data.pic;
