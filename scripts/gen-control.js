const menu = require('./menu.json');

const result = [];

menu.forEach(i => {
  i.children.forEach(i2 => {
    result.push({
      key: i2.name,
      title: i.meta.title + ' >>> ' + i2.meta.title,
    });
  });
});

console.log(JSON.stringify(result));
