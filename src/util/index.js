export const numOfDate = date =>
  parseInt(`${date.slice(0, 4)}${date.slice(5, 7)}${date.slice(8, 10)}`, 10);

export default {};
