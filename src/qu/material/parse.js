import he from 'he';

// jsonContent 的版本号，以备数据结构的变化
export const version = '1.0';
// jsonContent 解析器的版本号
export const parserVersion = '1.0';

export const PARSE_TYPE_TEXT = 1;
export const PARSE_TYPE_IMAGE = 2;

export const makeJsonItem = (type, content) => ({ type, content });

export const makeJsonContent = content => ({
  version,
  parserVersion,
  content,
});

export const getJsonContent = (content, jsonContent) => {
  if (jsonContent)
    return typeof jsonContent === 'string'
      ? JSON.parse(jsonContent)
      : jsonContent;

  // 1. 纯文字，2：img 标签
  const regExp = /(>([^><]+?)<)|(<img[^>]* src="([^"]+?)"[^>]*>)/gi;

  const result = [];
  let matches = regExp.exec(content);

  while (matches) {
    // 文字
    if (matches[2]) {
      const text = matches[2].trim();
      if (text) result.push(makeJsonItem(PARSE_TYPE_TEXT, he.decode(text)));
    }
    // 图片
    else if (matches[4]) {
      const url = matches[4].trim();
      if (url) result.push(makeJsonItem(PARSE_TYPE_IMAGE, url));
    }

    matches = regExp.exec(content);
  }

  return makeJsonContent(result);
};
