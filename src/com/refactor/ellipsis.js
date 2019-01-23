import JSONRefactor from 'json-refactor';

/**
 * 省略文本操作符，如果大于指定长度，将以省略号代替
 *
 * ellipsis!maxLength
 */
JSONRefactor.register({
  test: /^ellipsis!/i,
  handler: (originValue, operator) => {
    const length = parseInt(operator.split('!')[1], 10) || 20;

    return originValue.length > length
      ? `${originValue.slice(0, length)}...`
      : originValue;
  },
});
