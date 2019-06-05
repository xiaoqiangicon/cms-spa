export const addProps = [
  { name: 'isUpdate', full: !1, default: !1 },
  { name: 'updateId', full: !1, default: 0 },
  { name: 'dialogTitle', full: !1, default: '添加' },
  { name: 'visible', full: !0, default: !1 },

  // fields
  { name: 'cover', full: !0, default: '' },
  { name: 'content', full: !0, default: '' },
  { name: 'priority', full: !0, default: '' },
  { name: 'type', full: !0, default: 0 },

  { name: 'covers', full: !0, default: () => [] },
];

export const types = [
  {id: 0, name: '开放'},
  {id: 1, name: '限制'},
];
