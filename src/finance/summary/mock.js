export const list = {
  success: !0,
  totalCount: 99,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    time: '2019-01-01 01:01:01',
    showId: `showId ${id}`,
    title: `title ${id}`,
    amount: id * 10,
  })),
};

export const list1 = {
  errorCode: 0,
  pageSum: 9,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    add_time: '2019-01-01 01:01:01',
    wx_transaction_id: `showId ${id}`,
    title: `title ${id}`,
    price: id * 10,
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

export const types = {
  success: !0,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    name: `temple-${id}`,
    children: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(subId => ({
      id: id * 100 + subId,
      name: `temple-${id}-${subId}`,
    })),
  })),
};

export const types1 = {
  errorCode: 0,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    type: id,
    name: `temple-${id}`,
    subList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(subId => ({
      id: id * 100 + subId,
      name: `temple-${id}-${subId}`,
    })),
  })),
};
