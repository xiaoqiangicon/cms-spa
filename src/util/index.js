export const numOfDate = date =>
  parseInt(`${date.slice(0, 4)}${date.slice(5, 7)}${date.slice(8, 10)}`, 10);

// Date对象转为 2019-12-26 16:34:58 字符串格式
export const dateToString = d =>
  `${d.getFullYear()}-${d.getMonth() +
    1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;

export const fixedFloat = (num = 0, fixed = 2) => {
  if (String(num).indexOf('.') !== -1) {
    return parseFloat(num.toFixed(fixed));
  }
  return num;
};
