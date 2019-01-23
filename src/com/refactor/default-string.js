import JSONRefactor from 'json-refactor';

/**
 * 如果是空字符串或未定义，给予默认值
 *
 * default-string!value
 */
JSONRefactor.register({
  test: /^default-string!/i,
  handler: (originValue, operator) => {
    if (!originValue) return operator.split('!')[1];
    return originValue;
  },
});
