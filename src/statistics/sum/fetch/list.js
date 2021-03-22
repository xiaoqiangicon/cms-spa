import seeFetch from 'see-fetch';
import { isObject } from '../util.js';
var postHandle = function(res) {
  if (res.data && isObject(res.data)) {
    let app = res.data.app;
    let list = [];
    list[0] = {};
    list[0].source = 'App';
    Object.keys(res.data.app).forEach((key, index) => {
      list[0][key] = res.data.app[key];
    });

    list[1] = {};
    list[1].source = 'Wx';
    Object.keys(res.data.wx).forEach((key, index) => {
      list[1][key] = res.data.wx[key];
    });

    // 计算累计数值
    list[2] = {};
    list[2].source = '累计';
    let d = res.data,
      sum = {
        newUser: 0,
        registerUser: 0,
        payUser: 0,
        payNum: 0,
        payTotalMoney: 0,
        payMoreUser: 0,
        payMoreMoney: 0,
      },
      ignoreItem = ['oprationApp', 'oprationWx'];
    Object.keys(d).forEach((key, index, keyList) => {
      if (ignoreItem.indexOf(key) !== -1) return;
      Object.keys(sum).forEach(sKey => {
        if (!d[key][sKey]) return;
        sum[sKey] += Number(d[key][sKey]);
      });
    });
    // 处理累计值小数点
    Object.keys(sum).forEach(sKey => {
      if (String(sum[sKey]).indexOf('.') !== -1) {
        sum[sKey] = Number(Number(sum[sKey]).toFixed(2));
      }
      list[2][sKey] = sum[sKey];
    });
    console.log(sum);

    list[3] = {};
    list[3].source =
      '运营佛事： 当前数据来源是：自在好物、自在家、自在家推荐erp账户旗下项目，推广佛事模块和千寺祈福的数据';

    list[4] = {};
    list[4].source = 'APP支付';
    Object.keys(res.data.oprationApp).forEach((key, index) => {
      list[4][key] = res.data.oprationApp[key];
    });

    list[5] = {};
    list[5].source = 'SAAS支付';
    Object.keys(res.data.oprationWx).forEach((key, index) => {
      list[5][key] = res.data.oprationWx[key];
    });

    res.data.list = list;

    // 流水金额保留2位小数
    d.payMessageByType.forEach(item => {
      item.money = parseFloat(item.money).toFixed(2);
    });
    d.oprationWx.payTotalMoney = parseFloat(d.oprationWx.payTotalMoney).toFixed(
      2
    );
    d.oprationApp.payTotalMoney = parseFloat(
      d.oprationApp.payTotalMoney
    ).toFixed(2);
  }
};
seeFetch.config('statistics/sum/list', {
  method: ['post'],
  stringify: [!0],
  url: ['/stat/getPlatformStatistics', '/src/statistics/sum/mock/list'],
  postHandle: [postHandle, postHandle],
});
