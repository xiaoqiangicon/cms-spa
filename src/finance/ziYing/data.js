export const ziYingAddProps = [
  { name: 'isUpdate', full: !1, default: !1 },
  { name: 'updateId', full: !1, default: 0 },
  { name: 'dialogTitle', full: !1, default: '编辑' },
  { name: 'visible', full: !0, default: !1 },
  { name: 'foShiId', full: !0, default: 0 },
  { name: 'foShiName', full: !0, default: '' },
  { name: 'corporationProfitRate', full: !0, default: '' },
  { name: 'type', full: !0, default: 2 },
];

export const ziYingModifyRecordsProps = [
  { name: 'isUpdate', full: !1, default: !1 },
  { name: 'updateId', full: !1, default: 0 },
  { name: 'dialogTitle', full: !1, default: '记录' },
  { name: 'visible', full: !0, default: !1 },
  { name: 'id', full: !0, default: 0 },
  { name: 'foShiId', full: !0, default: 0 },
];

export const ziYingUseProps = [
  { name: 'isUpdate', full: !1, default: !1 },
  { name: 'updateId', full: !1, default: 0 },
  { name: 'dialogTitle', full: !1, default: '编辑' },
  { name: 'visible', full: !0, default: !1 },
  { name: 'foShiId', full: !0, default: 0 },
  { name: 'item', full: !0, default: () => ({}) },
];

export const ziYingUseRecordsProps = [
  { name: 'isUpdate', full: !1, default: !1 },
  { name: 'updateId', full: !1, default: 0 },
  { name: 'dialogTitle', full: !1, default: '记录' },
  { name: 'visible', full: !0, default: !1 },
  { name: 'id', full: !0, default: 0 },
  { name: 'foShiId', full: !0, default: 0 },
];

export const ziYingTypes = [
  { id: 2, name: '服务费类' },
  { id: 1, name: '商品销售' },
];
