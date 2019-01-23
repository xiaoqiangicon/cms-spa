import JSONRefactor from 'json-refactor';

/**
 * 如果某个字段未定义，给予默认值
 *
 * default!value
 *
 * `true` => true
 * `false` => false
 * `10.01` => 10.01
 * `other` => 'other'
 */
JSONRefactor.register({
  test: /^default!/i,
  handler: (originValue, operator) => {
    if (typeof originValue !== 'undefined') return originValue;

    const defaultValue = operator.split('!')[1];

    if (defaultValue === 'true') return true;
    if (defaultValue === 'false') return false;

    const floatValue = parseFloat(defaultValue);
    if (!Number.isNaN(floatValue)) return floatValue;

    return defaultValue;
  },
});
