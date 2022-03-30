import seeFetch from 'see-fetch';

const postHandle = res => {
  res.data &&
    res.data.forEach(item => {
      item.provinceJson &&
        (item.provinceJson.provinceList = item.provinceJson.province.split(
          ','
        ));
      item.cityJson && (item.cityJson.cityList = item.cityJson.city.split(','));

      if (item.default_userId) {
        let arr = [];
        let userList = item.default_userId.split(',');
        userList.forEach(user => {
          arr.push({ id: user });
        });
        item.userList = arr;
      } else {
        item.userList = [];
      }

      if (item.registerTime && item.registerTime > 0) {
        // 最近
        item.registerType = 0;
      }
      if (item.registerTimeStart || item.registerTimeEnd) {
        // 时间段
        item.registerType = 1;
      }
      item.ruleJson &&
        item.ruleJson.forEach(rule => {
          if (rule.ruleName === 'paySuccess') {
            item.paySuccess = rule;
            rule.ruleNameText = '支付成功';
          } else if (rule.ruleName === 'payMoney') {
            item.payMoney = rule;
            rule.ruleNameText = '支付金额';
          } else if (rule.ruleName === 'startApp') {
            item.startApp = rule;
            rule.ruleNameText = '启动App';
          }

          // 设置规则的时间段或者最近
          if (rule.startDate || rule.endDate) rule.dateType = 0;
          else rule.dateType = 1;
        });
    });
};
seeFetch.config('user/group/list', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/oprule/list',
    '/src/user/group/mock/list',
    '/src/user/group/mock/list',
  ],
  postHandle: [postHandle, postHandle],
});
