<template>
  <div class="container">
    <div class="title">渠道统计<span class="arrow">></span>{{ name }}</div>
    <el-card v-loading="loading" class="mg-t-20">
      <div class="dp-flex t-a-center">
        <div class="fx-1">
          <div>访问量</div>
          <div class="mg-t-10">
            {{ viewAll }}
          </div>
        </div>
        <div class="fx-1">
          <div>支付笔数</div>
          <div class="mg-t-10">
            {{ payNumAll }}
          </div>
        </div>
        <div class="fx-1">
          <div>支付金额（元）</div>
          <div class="mg-t-10">
            {{ payMoneyAll }}
          </div>
        </div>
      </div>
    </el-card>
    <el-card v-loading="loading" class="mg-t-20">
      <div class="select-time">
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy-MM-dd"
          unlink-panels
          @change="onChangeDatePicker"
        />
      </div>
      <canvas ref="chart" />
    </el-card>
    <el-card v-loading="loading" class="mg-t-20">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="日期" />
        <el-table-column prop="viewNum" label="访问量" />
        <el-table-column prop="payNum" label="支付笔数" />
        <el-table-column prop="payMoney" label="支付金额（元）" />
      </el-table>
    </el-card>
  </div>
</template>

<script>
import seeFetch from 'see-fetch';
import './fetch';
import Chart from 'chart.js';
import {
  formatTime,
  getAll,
  makeChartConfig,
  makeChartTitle,
  makeChartData,
  getTenDays,
} from './util';

let chart;

export default {
  data() {
    return {
      payNumAll: '',
      viewAll: '',
      payMoneyAll: '',
      chartData: [],
      name: '',
      channelId: '',
      loading: !1,
      date: ['', ''],
      formatDate: ['2019-10-16', '2019-10-18'],
      xAxis: [],
      tableData: [],
    };
  },
  created() {
    this.name = this.$route.params.channel;
    this.channelId = this.$route.params.channelId;
    this.formatDate[0] = this.$route.params.addTime;
    this.formatDate[1] = formatTime(getTenDays(this.formatDate[0]));
    // console.log(this.formatDate);
    this.fetchList();
  },
  mounted() {
    const { chart: chartRef } = this.$refs;

    chart = new Chart(chartRef.getContext('2d'), this.makeChartConfig());
  },
  beforeDestroy() {
    if (chart) {
      chart.destroy();
      chart = null;
    }
  },
  methods: {
    fetchList() {
      const { formatDate } = this;
      this.loading = !0;
      seeFetch('statistics/detail/list', {
        channelId: this.channelId,
        startDate: formatDate[0],
        endDate: formatDate[1],
      }).then(res => {
        if (res.success) {
          this.payNumAll = res.data.payNumAll;
          this.viewAll = res.data.viewAll;
          this.payMoneyAll = res.data.payMoneyAll;

          const viewNumResult = [];
          const payNumResult = [];
          const payMoneyResult = [];

          // 初始化表格数据
          this.tableData = [];

          res.data.list.forEach(item => {
            viewNumResult.push(item.viewNum);
            payNumResult.push(item.payNum);
            payMoneyResult.push(item.payMoney);
          });
          chart.data.datasets[0].data = viewNumResult;
          chart.data.datasets[1].data = payNumResult;
          chart.data.datasets[2].data = payMoneyResult;
          this.getAll(this.formatDate[0], this.formatDate[1]);
          chart.data.labels = this.xAxis;

          // 生成表格数据
          res.data.list.forEach((item, i) => {
            this.tableData.push({
              date: this.xAxis[i],
              viewNum: res.data.list[i].viewNum ? res.data.list[i].viewNum : 0,
              payNum: res.data.list[i].payNum ? res.data.list[i].payNum : 0,
              payMoney: res.data.list[i].payMoney,
            });
          });
          // 补充未返回的时间的数据
          for (let i = res.data.list.length; i < this.xAxis.length; i++) {
            viewNumResult.push(0);
            payNumResult.push(0);
            payMoneyResult.push(0);
            this.tableData.push({
              date: this.xAxis[i],
              viewNum: 0,
              payNum: 0,
              payMoney: 0,
            });
          }

          chart.update();
          this.loading = !1;
        }
      });
    },
    onChangeDatePicker() {
      const { date } = this;
      this.formatDate = date.map(item => formatTime(`${item}`));
      this.fetchList();
    },
    makeChartConfig() {
      return makeChartConfig({
        chartData: this.chartData,
      });
    },
    getAll(begin, end) {
      const ab = begin.split('-');
      const ae = end.split('-');
      const db = new Date();
      db.setUTCFullYear(ab[0], ab[1] - 1, ab[2]);
      const de = new Date();
      de.setUTCFullYear(ae[0], ae[1] - 1, ae[2]);
      const unixDb = db.getTime();
      const unixDe = de.getTime();
      const result = [];

      for (let k = unixDb; k <= unixDe; ) {
        result.push(formatTime(new Date(parseInt(k))));

        k += 24 * 60 * 60 * 1000;
      }
      this.xAxis = result;
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  padding: 40px 20px;
}
.title {
  font-size: 18px;
}
.arrow {
  margin: 0 8px;
}
.select-time {
  margin-bottom: 10px;
}
</style>
