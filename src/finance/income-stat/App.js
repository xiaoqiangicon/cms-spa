import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';
import Chart from 'chart.js';
import { now, dateByInterval } from '../../../../pro-com/src/utils';
import {
  makeChartConfig,
  makeChartConfig2,
  makeChartTitle,
  makeChartTitle2,
} from './util';
import './fetch';

let chart;
let chart2;

export default {
  name: 'App',
  data() {
    return {
      loading: !0,
      loadingSummary: !0,
      filterYear: now.year,
      total: 0,
      yearTotal: 0,
      monthTotal: 0,
      toUseMonthTotal: 0,
      usedMonthTotal: 0,
      yearList: [],
      toUseList: [],
      usedList: [],
      projects: [],
      offlineTotal: 0,
      offlineYearTotal: 0,
      offlineMonthTotal: 0,
      offlineYearList: [],
      list: [],
      years: [],
      filterType: 1,
      filterStartDate: dateByInterval(-30),
      filterEndDate: now.date,
      filterDimension: 2,
      allTotal: 0,
      allYearTotal: 0,
      allMonthTotal: 0,
    };
  },
  created() {
    for (let i = now.year; i >= 2016; i -= 1) this.years.push(i);

    this.fetchSummary();
    this.fetchList();
  },
  mounted() {
    const { chart: chartRef, chart2: chartRef2 } = this.$refs;

    chart = new Chart(chartRef.getContext('2d'), this.makeChartConfig());
    chart2 = new Chart(chartRef2.getContext('2d'), this.makeChartConfig2());
  },
  beforeDestroy() {
    if (chart) {
      chart.destroy();
      chart = null;
    }
    if (chart2) {
      chart2.destroy();
      chart2 = null;
    }
  },
  methods: {
    makeChartConfig() {
      return makeChartConfig({
        year: this.filterYear,
        onlineData: this.yearList,
        offlineData: this.offlineYearList,
      });
    },
    makeChartConfig2() {
      return makeChartConfig2({
        year: this.filterYear,
        incomeData: this.toUseList,
        outcomeData: this.usedList,
      });
    },
    fetchSummary() {
      this.loadingSummary = !0;

      let count = 0;

      seeFetch('finance/income-stat/summary', { year: this.filterYear }).then(
        res => {
          if (!res.success) {
            Notification({
              title: '提示',
              message: res.message || '未知错误，请稍后重试',
            });
            return;
          }

          this.total = res.total || 0;
          this.yearTotal = res.yearTotal || 0;
          this.monthTotal = res.monthTotal || 0;
          this.toUseMonthTotal = res.toUseMonthTotal || 0;
          this.usedMonthTotal = res.usedMonthTotal || 0;
          this.yearList = res.yearList;
          this.toUseList = res.toUseList;
          this.usedList = res.usedList;
          this.projects = res.projects;

          count += 1;
          if (count >= 2) this.afterFetchSummary();
        }
      );

      seeFetch('finance/income-stat/offline', { year: this.filterYear }).then(
        res => {
          if (!res.success) {
            Notification({
              title: '提示',
              message: res.message || '未知错误，请稍后重试',
            });
            return;
          }

          this.offlineTotal = res.total || 0;
          this.offlineYearTotal = res.yearTotal || 0;
          this.offlineMonthTotal = res.monthTotal || 0;
          this.offlineYearList = res.yearList;

          count += 1;
          if (count >= 2) this.afterFetchSummary();
        }
      );
    },
    refreshFields() {
      this.allTotal = parseFloat(
        (parseFloat(this.total) + parseFloat(this.offlineTotal)).toFixed(2)
      );
      this.allYearTotal = parseFloat(
        (
          parseFloat(this.yearTotal) + parseFloat(this.offlineYearTotal)
        ).toFixed(2)
      );
      this.allMonthTotal = parseFloat(
        (
          parseFloat(this.monthTotal) + parseFloat(this.offlineMonthTotal)
        ).toFixed(2)
      );
    },
    afterFetchSummary() {
      this.loadingSummary = !1;

      this.refreshFields();

      chart.options.title.text = makeChartTitle({ year: this.filterYear });
      chart.data.datasets[0].data = this.yearList;
      chart.data.datasets[1].data = this.offlineYearList;
      chart.update();

      chart2.options.title.text = makeChartTitle2({ year: this.filterYear });
      chart2.data.datasets[0].data = this.toUseList;
      chart2.data.datasets[1].data = this.usedList.map(i => 0 - i);
      chart2.update();
    },
    doSearchSummary() {
      this.fetchSummary();
    },
    fetchList() {
      this.loading = !0;

      seeFetch('finance/income-stat/list', {
        type: this.filterType,
        dimension: this.filterDimension,
        startDate: this.filterStartDate,
        endDate: this.filterEndDate,
      }).then(res => {
        if (!res.success) {
          Notification({
            title: '提示',
            message: res.message,
          });
          return;
        }

        this.loading = !1;
        this.list = res.data;
      });
    },
    doSearch() {
      this.fetchList();
    },
    changeDimension(dimension) {
      if (this.filterDimension === dimension) return;

      this.filterDimension = dimension;
      this.doSearch();
    },
    downloadExcel() {
      window.open(
        `/earningsStatistics/getEarningsExcel?startTime=${this.filterStartDate}&endTime=${this.filterEndDate}`,
        '_blank'
      );
    },
  },
};
