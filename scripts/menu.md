# 生成菜单 cms 项目用

1. `'把 routes.js 中的 export default 后的数组文件负责到这里来'.replace(/component:[^,]+,/g, 'component: true,');`
2. 把生成的字符串生成对象，`true` 替换为 `1`
3. 序列化
