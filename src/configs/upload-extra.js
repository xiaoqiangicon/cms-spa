const isLocal = window.location.hostname.indexOf('localhost') > -1;

export const base64Url = isLocal ? '/mock/upload.json' : '/upload/picBase64';
export const base64Handle = isLocal ? res => res.data.pic : res => res.data.url;
