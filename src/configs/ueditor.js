const isLocal = window.location.hostname.indexOf('localhost') > -1;

window.UEDITOR_HOME_URL = isLocal
  ? 'https://wx.zizaihome.com/h5/static/ueditor/'
  : '/res/ueditor/';
window.UEDITOR_SERVER_URL = '';
