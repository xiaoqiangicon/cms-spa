export const list = {
  success: !0,
  total: 99,
  result: 1,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    name: `渠道${id}`,
    url: 'www.baidu.com',
    remark: '备注',
    channel: 'env-surs',
    endDate: '2019-01-01 01:01:01',
    addTime: '2018-10-29',
  })),
};

export const save = {
  result: 1,
  success: !0,
};
