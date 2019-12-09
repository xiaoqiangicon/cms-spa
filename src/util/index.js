export const numOfDate = date =>
  parseInt(`${date.slice(0, 4)}${date.slice(5, 7)}${date.slice(8, 10)}`, 10);

export const fixedFloat = (num = 0, fixed = 2) =>
  parseFloat(num.toFixed(fixed));

export const isArray = arr =>
  Object.prototype.toString.call(arr) === '[object Array]';
