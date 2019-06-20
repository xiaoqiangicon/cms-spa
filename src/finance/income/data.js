export const shiJingAddProps = [
  { name: 'isUpdate', full: !1, default: !1 },
  { name: 'updateId', full: !1, default: 0 },
  { name: 'dialogTitle', full: !1, default: '编辑' },
  { name: 'visible', full: !0, default: !1 },
  { name: 'templeId', full: !0, default: 0 },
  { name: 'templeName', full: !0, default: '' },
  { name: 'serviceCharge', full: !0, default: '' },
  { name: 'takeEffectTime', full: !0, default: '' },
];

export const shiJingRecordsProps = [
  { name: 'isUpdate', full: !1, default: !1 },
  { name: 'updateId', full: !1, default: 0 },
  { name: 'dialogTitle', full: !1, default: '记录' },
  { name: 'visible', full: !0, default: !1 },
  { name: 'id', full: !0, default: 0 },
];

export const gongFengAddProps = [
  { name: 'isUpdate', full: !1, default: !1 },
  { name: 'updateId', full: !1, default: 0 },
  { name: 'dialogTitle', full: !1, default: '编辑' },
  { name: 'visible', full: !0, default: !1 },
  { name: 'templeId', full: !0, default: 0 },
  { name: 'templeName', full: !0, default: '' },
  { name: 'serviceCharge', full: !0, default: '' },
  { name: 'takeEffectTime', full: !0, default: '' },
];

export const gongFengRecordsProps = [
  { name: 'isUpdate', full: !1, default: !1 },
  { name: 'updateId', full: !1, default: 0 },
  { name: 'dialogTitle', full: !1, default: '记录' },
  { name: 'visible', full: !0, default: !1 },
  { name: 'id', full: !0, default: 0 },
];

export const foShiAddProps = [
  { name: 'isUpdate', full: !1, default: !1 },
  { name: 'updateId', full: !1, default: 0 },
  { name: 'dialogTitle', full: !1, default: '编辑' },
  { name: 'visible', full: !0, default: !1 },
  { name: 'templeId', full: !0, default: 0 },
  { name: 'templeName', full: !0, default: '' },
  { name: 'foShiId', full: !0, default: 0 },
  { name: 'foShiName', full: !0, default: '' },
  { name: 'serviceCharge', full: !0, default: '' },
  { name: 'takeEffectTime', full: !0, default: '' },
  { name: 'item', full: !0, default: () => ({}) },
];

export const foShiRecordsProps = [
  { name: 'isUpdate', full: !1, default: !1 },
  { name: 'updateId', full: !1, default: 0 },
  { name: 'dialogTitle', full: !1, default: '记录' },
  { name: 'visible', full: !0, default: !1 },
  { name: 'id', full: !0, default: 0 },
  { name: 'foShiId', full: !0, default: 0 },
];

export const ziYingAddProps = [
  { name: 'isUpdate', full: !1, default: !1 },
  { name: 'updateId', full: !1, default: 0 },
  { name: 'dialogTitle', full: !1, default: '编辑' },
  { name: 'visible', full: !0, default: !1 },
  { name: 'foShiId', full: !0, default: 0 },
  { name: 'foShiName', full: !0, default: '' },
  { name: 'corporationProfitRate', full: !0, default: '' },
  { name: 'type', full: !0, default: 1 },
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
  { id: 1, name: '商品销售' },
  { id: 2, name: '服务费类' },
];
