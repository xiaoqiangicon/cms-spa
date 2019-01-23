import JSONRefactor from 'json-refactor';

/**
 * 截取文本操作符
 *
 * slice!start!end
 */
JSONRefactor.register({
  test: /^slice!/i,
  handler: (originValue, operator) => {
    if (!originValue) return originValue;

    const operators = operator.split('!');
    const start = parseInt(operators[1], 10);
    const end = parseInt(operators[2], 10);
    const hasStart = !!start || start === 0;
    const hasEnd = !!end || end === 0;

    let newValue = originValue;

    if (hasStart && hasEnd) newValue = originValue.slice(start, end);
    else if (hasStart) newValue = originValue.slice(start);

    return newValue;
  },
});
