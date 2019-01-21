/* eslint-disable no-param-reassign */
import cookie from 'js-cookie';
import old from './old.json';

const subDomain = window.location.hostname.split('.')[0];
const domain = subDomain === 'cms' ? 'http://cms.miaoyan.org' : 'http://gstest.zizaihome.com';
const isLocal = subDomain.indexOf('localhost') > -1;

const valid = item => isLocal || !item.controlMark || !!parseInt(cookie.get(item.controlMark), 10);

const first = old.items.filter(item => valid(item));

first.forEach(item => {
  const {subItems} = item;
  item.subItems = subItems.filter(subItem => valid(subItem));
});

const second = first.filter(item => item.subItems && item.subItems.length);

console.log(second);

export default second.map(({id, name, icon, subItems}) => ({
  path: `${domain}/${id}`,
  name,
  meta: {
    title: name,
    icon,
  },
  children: subItems.map(({name: subName, link}) => ({
    path: `${domain}${link}`,
    name: subName,
    meta: { title: subName },
  })),
}));
