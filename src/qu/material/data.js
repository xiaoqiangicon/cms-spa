export const addProps = [
  { name: 'isUpdate', full: !1, default: !1 },
  { name: 'updateId', full: !1, default: 0 },
  { name: 'dialogTitle', full: !1, default: '添加' },
  { name: 'visible', full: !0, default: !1 },
  // fields
  { name: 'title', full: !0, default: '' },
  { name: 'content', full: !0, default: '' },
  { name: 'jsonContent', full: !0, default: () => ({}) },
];

export const statuses = [
  { id: 1, name: '草稿' },
  { id: 2, name: '已发布' },
  { id: 3, name: '回收站' },
];
