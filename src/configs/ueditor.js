const isLocal = window.location.hostname.indexOf('localhost') > -1;

window.UEDITOR_HOME_URL = isLocal ? '/pro-com/src/ueditor/' : '/res/ueditor/';
window.UEDITOR_SERVER_URL = '';
