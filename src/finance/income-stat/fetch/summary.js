import seeFetch from 'see-fetch';
import { ziYingTypes } from '../data';

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
  12: '自动转单',
  13: '禅在订单',
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
  11: '按佛事项目设置分成比例扣除所得营收',
  12: '组合订单模块的数据统计，按订单处理完成计算。目前使用的模块为：APP超度和祈福页面',
  13: '',
};

const responseRefactor = {
  total: 'data.totalEarningsMoney',
  yearTotal: 'data.yearEarningsMoney',
  monthTotal: 'data.monthEarningsMoney',
  projects: 'data.yearEarningsMoneyProportion',
  _projects: [
    { id: 'type', amount: 'earningsMoney', subType: 'commodityType' },
  ],
};

/* eslint-disable no-param-reassign */
const postHandle = res => {
  if (res.projects && res.projects.length) {
    // 计算总金额
    let totalAmount = 0;
    res.projects.forEach(project => {
      project.amount = parseFloat(project.amount.toFixed(2));
      totalAmount += project.amount;
    });

    // 格式化每个项目
    res.projects.forEach(project => {
      project.name = projectNames[project.id];
      project.tooltip = tooltips[project.id];
      project.percent = parseFloat(
        ((project.amount * 100) / totalAmount).toFixed(2)
      );
    });

    // 自营项目的两个子项目
    const newProjects = [];
    let ziYingProject;
    res.projects.forEach(project => {
      if (project.id !== 11) {
        newProjects.push(project);
        return;
      }

      if (!ziYingProject) {
        ziYingProject = { ...project, subItems: [], amount: 0 };
        delete ziYingProject.subType;
        delete ziYingProject.commodityType;
        newProjects.push(ziYingProject);
      }

      ziYingProject.amount += project.amount;
      ziYingProject.subItems.push({
        ...project,
        name: ziYingTypes.find(i => i.id === project.subType).name,
      });
    });

    if (ziYingProject) {
      ziYingProject.percent = parseFloat(
        ((ziYingProject.amount * 100) / totalAmount).toFixed(2)
      );
    }
    res.projects = newProjects;
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
