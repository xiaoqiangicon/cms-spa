export const items = [
  { id: 0, name: '其他' },
  { id: 1, name: '皈依' },
  { id: 2, name: '佛事' },
  { id: 3, name: '直播' },
  { id: 4, name: '供佛墙' },
  { id: 5, name: '文章' },
  { id: 6, name: '实景探寺' },
  { id: 7, name: '掌中佛殿贡品' },
  { id: 8, name: '续费掌中佛殿' },
  { id: 100, name: '智能硬件' },
  { id: 101, name: '文创产品' },
];

export const itemsMap = {};

items.forEach(item => {
  itemsMap[item.id] = item.name;
});
