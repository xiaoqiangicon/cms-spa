const randomMoney = () => Math.floor(Math.random() * 900 * 10000) + 100 * 10000;

export const list = {
  success: true,
  total: 99,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    key: id,
    templeId: id,
    templeName: `寺院名 ${id}`,
    foShiId: id,
    foShiName: `佛事名 ${id}`,
    amount: id * 10,
    profit: id * 11,
    chargeRate: id * 12,
    yueGuangBaoHe: id * 13,
    manualRecord: id * 14,
    orderCount: id * 15,
    faShiProfit: id * 16,
    time: '2016-01-01',
  })),
};

export const list1 = {
  errorCode: 0,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    templeName: `寺院名 ${id}`,
    commodityName: `佛事名 ${id}`,
    orderMoney: id * 10,
    earningsMoney: id * 11,
    templeFinancePercent: id * 12,
    moonBoxMoney: id * 13,
    manualRecord: id * 14,
    orderNum: id * 15,
    bonzeMoney: id * 16,
    incomeTime: '2016-01-01',
  })),
};

export const offline = {
  success: true,
  total: 12345678,
  yearTotal: 1234567,
  monthTotal: 123456,
  yearList: [
    randomMoney(),
    randomMoney(),
    randomMoney(),
    randomMoney(),
    randomMoney(),
    randomMoney(),
    randomMoney(),
    randomMoney(),
    randomMoney(),
    randomMoney(),
    randomMoney(),
    randomMoney(),
  ],
};

export const offline1 = {
  errorCode: 0,
  data: {
    totalManualRecordMoney: 12345678,
    yearManualRecordMoney: 1234567,
    monthManualRecordMoney: 123456,
    monthManualRecordMoneyList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
      month => ({
        getDate: `2018-${month > 9 ? month : `0${month}`}`,
        money: randomMoney(),
      })
    ),
  },
};

export const summary = {
  success: true,
  total: 12345678,
  yearTotal: 1234567,
  monthTotal: 123456,
  yearList: [
    randomMoney(),
    randomMoney(),
    randomMoney(),
    randomMoney(),
    randomMoney(),
    randomMoney(),
    randomMoney(),
    randomMoney(),
    randomMoney(),
    randomMoney(),
    randomMoney(),
    randomMoney(),
  ],
  projects: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(id => ({
    id,
    name: `项目${id}`,
    amount: randomMoney(),
    percent: id * 10,
  })),
};

export const summary1 = {
  errorCode: 0,
  data: {
    totalEarningsMoney: 12345678,
    yearEarningsMoney: 1234567,
    monthEarningsMoney: 123456,
    monthEarningsMoneyList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
      month => ({
        incomeTime: `2018-${month > 9 ? month : `0${month}`}`,
        earningsMoney: randomMoney(),
      })
    ),
    yearEarningsMoneyProportion: [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
    ].map(id => ({
      type: id,
      earningsMoney: randomMoney(),
    })),
  },
};
