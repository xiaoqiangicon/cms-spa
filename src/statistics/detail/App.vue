<template>
  <div class="container">
    <div class="title">渠道统计<span class="arrow">></span>{{ name }}</div>
    <el-card v-loading="loading" class="mg-t-20">
      <div class="dp-flex t-a-center">
        <div class="fx-1">
          <div>访问量</div>
          <div class="mg-t-10">
            {{ totalVisit }}
          </div>
        </div>
        <div class="fx-1">
          <div>支付笔数</div>
          <div class="mg-t-10">
            {{ totalAccount }}
          </div>
        </div>
        <div class="fx-1">
          <div>支付金额（元）</div>
          <div class="mg-t-10">
            {{ totalMoney }}
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
} from './util';

let chart;

export default {
  data() {
    return {
      totalAccount: '',
      totalVisit: '',
      totalMoney: '',
      chartData: [],
      name: '',
      loading: !1,
      date: ['', ''],
      formatDate: ['2019-10-16', '2019-10-18'],
      xAxis: [],
    };
  },
  created() {
    this.name = this.$route.params.channel;
    this.fetchList();
  },
  mounted() {
    const { chart: chartRef } = this.$refs;

    chart = new Chart(chartRef.getContext('2d'), this.makeChartConfig());
  },
  methods: {
    fetchList() {
      const { formatDate } = this;
      seeFetch('statistics/detail/list', {
        startTime: formatDate[0],
        endTime: formatDate[1],
      }).then(res => {
        if (res.success) {
          this.totalAccount = res.totalAccount;
          this.totalVisit = res.totalVisit;
          this.totalMoney = res.totalMoney;

          // chart.data.datasets[0].data = res.data;
          this.getAll(this.formatDate[0], this.formatDate[1]);
          chart.data.labels = this.xAxis;
          chart.update();
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
