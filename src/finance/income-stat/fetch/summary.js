import seeFetch from 'see-fetch';

const projectNames = {
  1: '推广佛事',
  4: '转单系统',
  2: '实景探寺',
  3: '微供奉',
  5: '法师祈福',
  6: '提现打赏',
  7: '分销推广',
  8: '文章打赏',
  9: '千寺祈福',
  10: '日行一善',
  11: '自营佛事',
};

const tooltips = {
  1: '按用户下单的时间计算',
  4: '按确认或订单自动完成时间计算',
  2: '',
  3: '',
  5: '用户点感恩或订单自动完成计算',
  6: '提现账单流程完成后计算',
  7: '',
  8: '自营寺院的所有文章打赏，用户下单的时间计算',
  9: '按用户下单的时间计算',
  10: '自在家推荐寺院的日行一善模块，按用户下单的时间计算',
  11: '按佛事项目设置分成比例扣除所得盈收',
};

const responseRefactor = {
  total: 'data.totalEarningsMoney',
  yearTotal: 'data.yearEarningsMoney',
  monthTotal: 'data.monthEarningsMoney',
  projects: 'data.yearEarningsMoneyProportion',
  _projects: [{ id: 'type', amount: 'earningsMoney' }],
};

/* eslint-disable no-param-reassign */
const postHandle = res => {
  if (res.projects && res.projects.length) {
    let totalAmount = 0;
    res.projects.forEach(project => {
      project.amount = parseFloat(project.amount.toFixed(2));
      totalAmount += project.amount;
    });
    res.projects.forEach(project => {
      project.name = projectNames[project.id];
      project.tooltip = tooltips[project.id];
      project.percent = parseFloat(
        ((project.amount * 100) / totalAmount).toFixed(2)
      );
    });
  }

  res.yearList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  if (res.data.monthEarningsMoneyList) {
    res.data.monthEarningsMoneyList.forEach(item => {
      res.yearList[
        parseInt(item.incomeTime.split('-')[1], 10) - 1
      ] = parseFloat(parseFloat(item.earningsMoney).toFixed(2));
    });
  }
};

seeFetch.config('finance/income-stat/summary', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/earningsStatistics/getEarningsTotal',
    '/finance/income-stat/mock/summary1',
    '/finance/income-stat/mock/summary',
  ],
  responseRefactor: [responseRefactor, responseRefactor],
  postHandle: [postHandle, postHandle],
});
