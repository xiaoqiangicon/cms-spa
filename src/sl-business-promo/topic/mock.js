export const allSellers = {
  success: true,
  data: {
    list: '.'
      .repeat(10)
      .split('')
      .map((d, i) => ({
        id: i + 1,
        name: `销售员${i + 1}`,
      })),
  },
};
export const allSellersS = {
  result: 1,
  data: {
    list: '.'
      .repeat(10)
      .split('')
      .map((d, i) => ({
        id: i + 1,
        name: `销售员${i + 1}`,
        sid: '123',
      })),
  },
};

export const activeSellers = {
  success: true,
  data: {
    list: '.'
      .repeat(5)
      .split('')
      .map((d, i) => ({
        id: i + 1,
        name: `销售员${i + 1}`,
      })),
  },
};
export const activeSellersS = {
  result: 1,
  data: {
    list: '.'
      .repeat(5)
      .split('')
      .map((d, i) => ({
        id: i + 1,
        name: `销售员${i + 1}`,
      })),
  },
};

export const updateSeller = { success: true };
export const updateSellerS = { result: 1 };
