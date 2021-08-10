import { formatInputItem } from '../../utils/format';

export function checkItemValid(item) {
  const newItem = formatInputItem(item);

  if (!newItem.name) return '寺院名称不能为空';
  if (!newItem.headImg) return '寺院头像不能为空';
  if (!newItem.content) return '内容不能为空';

  if (!parseInt(newItem.num, 10)) newItem.num = 0;

  return newItem;
}
