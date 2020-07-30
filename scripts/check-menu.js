const menu = require('./menu.json');

const paths = [];
const names = [];

menu.forEach(i => {
  paths.push(i.path);
  names.push(i.name);

  i.children.forEach(i2 => {
    paths.push(i2.path.slice(0, 1) !== '/' ? `${i.path}/${i2.path}` : i2.path);
    names.push(i2.name);
  });
});

if (paths.indexOf('') > -1) console.log('Has empty path');
if (names.indexOf('') > -1) console.log('Has empty name');

const pathsRecord = {};

paths.forEach(i => {
  if (pathsRecord[i]) pathsRecord[i] += 1;
  else pathsRecord[i] = 1;
});

Object.keys(pathsRecord).forEach(i => {
  if (pathsRecord[i] > 1) console.log(i);
});

const namesRecord = {};

names.forEach(i => {
  if (namesRecord[i]) namesRecord[i] += 1;
  else namesRecord[i] = 1;
});

Object.keys(namesRecord).forEach(i => {
  if (namesRecord[i] > 1) console.log(i);
});
