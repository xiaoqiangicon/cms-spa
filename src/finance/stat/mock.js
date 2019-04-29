export const list = {
  success: !0,
  totalIncome: 10000,
  totalTaken: 6000,
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

export const list1 = {
  errorCode: 0,
  price_sum: 10000,
  pick_money_sum: 6000,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(id => ({
    id,
    add_time: `2019-${id > 9 ? id : `0${id}`}-01`,
    price: id * 10,
    cnt: id * 5,
    canPickUpMoney: id * 10,
    pickMoney: id * 8,
  })),
};

export const temples = {
  success: !0,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    name: `temple-${id}`,
  })),
};

export const temples1 = {
  errorCode: 0,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    temple_name: `temple-${id}`,
  })),
};
