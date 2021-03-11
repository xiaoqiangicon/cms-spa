const listReqRenameKeys = {
  search: 'content',
  page: 'pageNum',
};

export function handleListReqParams(params) {
  Object.keys(listReqRenameKeys).forEach(key => {
    params[listReqRenameKeys[key]] = params[key];
    delete params[key];
  });

  params.pageNum -= 1;
  params.pageSize = 10;

  return params;
}

const listReqRefactorFields = {
  wxAccount: 'accounts',
  wxAuthor: 'author',
  content: 'articleHtml',
  contentText: 'articleText',
  addedToLibrary: 'isUse',
  pullTime: 'pullTime',
  addedVideoToLibrary: 'isUseVideo',
};

export function handleListReqResponse(res) {
  if (!res.data || !res.data.list) return;

  res.data.list.forEach(item => {
    Object.keys(listReqRefactorFields).forEach(key => {
      item[key] = item[listReqRefactorFields[key]];
    });

    item.content = item.content.trim();
    item.shortContentText = item.contentText
      ? item.contentText.slice(0, 40)
      : '';

    if (item.articleImg) {
      item.cover = item.articleImg.split(',')[0];
    }
    item.hasImages = !!item.articleImg;
    item.hasVideos = !!item.articleVideo;
  });
}
