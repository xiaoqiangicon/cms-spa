export const addProps = [
  { name: 'isUpdate', full: !1, default: !1 },
  { name: 'updateId', full: !1, default: 0 },
  { name: 'dialogTitle', full: !1, default: '添加' },
  { name: 'visible', full: !0, default: !1 },
  // fields
  { name: 'title', full: !0, default: '' },
  { name: 'content', full: !0, default: '' },
  { name: 'jsonContent', full: !0, default: () => ({}) },
  { name: 'region', full: !0, default: '' },
  { name: 'publishAccount', full: !0, default: 1 },
  { name: 'covers', full: !0, default: () => [] },
  { name: 'publishAuthor', full: !0, default: '' },
  { name: 'original', full: !0, default: 0 },
  { name: 'publishTime', full: !0, default: '' },
];

export const statuses = [
  { id: 0, name: '草稿' },
  { id: 1, name: '已发布' },
  { id: 2, name: '已发布' },
  { id: -1, name: '回收站' },
];

export const publishAccounts = [
  { id: 1, name: '寺院法讯' },
  { id: 2, name: '佛学知识' },
  { id: 3, name: '菩菩公园' },
  { id: 4, name: '心灵暖港' },
];

const regionsStr =
  '全国 北京 天津 河北 山西 内蒙古 辽宁 吉林 黑龙江 上海 江苏 浙江 安徽 福建 江西 山东 河南 湖北 湖南 广东 广西 海南 重庆 四川 贵州 云南 西藏 陕西 甘肃 青海 宁夏 新疆';

export const regions = regionsStr.split(/\s+/g);
