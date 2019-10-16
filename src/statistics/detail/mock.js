export const list = {
  success: !0,
  result: 1,
  totalMoney: 10000,
  totalAccount: 1234,
  totalVisit: 8000,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(id => ({
    id,
    year: 2019,
    month: id,
    income: id * 10,
    count: id * 5,
    taken: id * 8,
    remain: id * 2,
  })),
};
