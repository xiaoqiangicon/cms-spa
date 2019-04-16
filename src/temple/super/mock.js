export const templeList = {
  errorCode: 0,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    name: `标题标题标题标题 ${id}`,
  })),
};

export const getAdmin = {
  errorCode: 0,
  data: {
    templeId: 2,
  },
};

export const updateAdmin = {
  errorCode: 0,
};
