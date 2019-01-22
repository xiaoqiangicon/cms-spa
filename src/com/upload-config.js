// 本地测试环境
if (window.location.hostname.indexOf('localhost') > -1) {
  window.zzhUploadUrl = '/mock/upload.json';
} else {
  window.zzhUploadUrl = '/upload';
}

window.zzhUploadHandle = res => res.data.pic;
