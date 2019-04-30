<template>
  <div class="container">
    <div>
      <el-button size="small" plain type="primary">
        善款统计
      </el-button>
      <el-button size="small" plain @click="toNav(2)">
        善款明细
      </el-button>
      <el-button size="small" plain @click="toNav(3)">
        特殊提现
      </el-button>
    </div>
    <div class="mg-t-20">
      <el-select
        v-model="filterTemple"
        filterable
        placeholder="请选择"
        size="small"
        style="width: 200px;"
        @change="doSearch"
      >
        <el-option label="汇总" :value="0" />
        <el-option
          v-for="item in temples"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-select
        v-model="filterYear"
        filterable
        placeholder="请选择"
        size="small"
        style="width: 200px;"
        @change="doSearch"
      >
        <el-option
          v-for="year in years"
          :key="year"
          :label="year + '年'"
          :value="year"
        />
      </el-select>
    </div>
    <el-card class="mg-t-20">
      <div class="dp-flex t-a-center">
        <div class="fx-1">
          <div>累计善款 （每日0点更新）</div>
          <div class="mg-t-10">{{ totalIncome }}元</div>
        </div>
        <div class="fx-1">
          <div>累计已提现</div>
          <div class="mg-t-10">{{ totalTaken }}元</div>
          <div class="mg-t-10">
            <el-button size="small" plain @click="toSummary">
              提现记录
            </el-button>
          </div>
        </div>
        <div class="fx-1">
          <div>结余</div>
          <div class="mg-t-10">{{ totalRemain }}元</div>
          <div class="mg-t-10">
            <el-button size="small" plain> 可提现{{ canTake }}元 </el-button>
            <el-button size="small" plain> 不可提现{{ cantTake }}元 </el-button>
          </div>
        </div>
      </div>
    </el-card>
    <el-card class="mg-t-20">
      <canvas ref="chart" />
    </el-card>
    <el-card class="mg-t-20">
      <div class="body">
        <el-table v-loading="loading" :data="list" style="width: 100%">
          <el-table-column prop="item" label="日期">
            <template slot-scope="item">
              {{ item.row.year }}年{{ item.row.month }}月
            </template>
          </el-table-column>
          <el-table-column prop="income" label="善款收入" />
          <el-table-column prop="count" label="善款数量" />
          <el-table-column prop="taken" label="提现完成" />
          <el-table-column prop="remain" label="结余" />
          <el-table-column label="操作">
            <template slot-scope="item">
              <el-button type="text" size="small" @click="toDetail(item)">
                查看详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';
import { now, fillZero } from '@zzh/n-util';
import Chart from 'chart.js';
import { makeChartConfig, makeChartTitle } from './util';
import './fetch';

let chart;

export default {
  name: 'App',
  data() {
    return {
      loading: !0,
      list: [],
      filterTemple: 0,
      temples: [],
      filterYear: now.year,
      years: [],
      total: 0,
      chartData: [],
      totalIncome: 0,
      totalTaken: 0,
      totalRemain: 0,
      canTake: 0,
      cantTake: 0,
    };
  },
  created() {
    for (let i = now.year; i >= 2016; i -= 1) this.years.push(i);

    seeFetch('finance/stat/temples').then(res => {
      if (!res.success || !res.data || !res.data.length) {
        Notification({
          title: '提示',
          message: '获取寺院数据失败',
        });
        return;
      }

      this.temples = res.data;
    });

    this.requestList();
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
    makeChartConfig() {
      return makeChartConfig({
        year: this.filterYear,
        total: this.total,
        chartData: this.chartData,
      });
    },
    toNav(sequence) {
      if (sequence === 1) this.$router.push('/finance/stat');
      else if (sequence === 2) this.$router.push('/finance/summary');
      else if (sequence === 3) this.$router.push('/finance/special');
    },
    requestList() {
      this.loading = !0;

      seeFetch('finance/stat/list', {
        templeId: this.filterTemple,
        year: this.filterYear,
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
        this.chartData = res.data.map(i => i.income);
        this.total = this.chartData.reduce((num, i) => i + num);

        this.totalIncome = res.totalIncome || 0;
        this.totalTaken = res.totalTaken || 0;
        this.canTake = res.canTake || 0;
        this.cantTake = res.cantTake || 0;
        this.totalRemain = (this.canTake + this.cantTake).toFixed(2);

        chart.options.title.text = makeChartTitle({
          year: this.filterYear,
          total: this.total,
        });
        chart.data.datasets[0].data = this.chartData;
        chart.update();

        window.scrollTo(0, 0);
      });
    },
    doSearch() {
      this.requestList();
    },
    toSummary() {
      window.sessionStorage[
        'finance/pending||filterTemple'
      ] = this.filterTemple;
      window.sessionStorage['finance/pending||filterStatus'] = 3;
      this.$router.push('/finance/pending');
    },
    toDetail({ row: item }) {
      const { year, month } = item;
      const start = `${year}-${fillZero(month)}-01`;
      const end = `${month === 12 ? year + 1 : year}-${fillZero(
        month === 12 ? 1 : month + 1
      )}-01`;

      window.sessionStorage[
        'finance/summary||filterTemple'
      ] = this.filterTemple;
      window.sessionStorage['finance/summary||filterStart'] = start;
      window.sessionStorage['finance/summary||filterEnd'] = end;

      this.$router.push(`/finance/summary`);
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  padding: 40px 20px;
}

.body {
  margin-top: 20px;
}
</style>
