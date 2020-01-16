/* eslint-disable no-param-reassign */
import old from './old.json';
import { domain, valid } from './data';

const first = old.items.filter(item => valid(item));

first.forEach(item => {
  const { subItems } = item;
  item.subItems = subItems.filter(subItem => valid(subItem));
});

const second = first.filter(item => item.subItems && item.subItems.length);

export default second.map(({ id, name, subItems }) => ({
  path: `${domain}/${id}`,
  name,
  meta: {
    title: name,
    icon: 'fa-circle',
  },
  children: subItems.map(({ name: subName, link }) => ({
    path: `${domain}${link}`,
    name: subName,
    meta: { title: subName },
  })),
}));
