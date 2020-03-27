<template>
  <div class="container">
    <el-card v-loading="loadingSummary" class="mg-t-20">
      <div slot="header" class="clearfix">
        <span>营收概览</span>
      </div>
      <el-select
        v-model="filterYear"
        filterable
        placeholder="请选择"
        size="small"
        style="width: 200px;"
        @change="doSearchSummary"
      >
        <el-option
          v-for="year in years"
          :key="year"
          :label="year + '年'"
          :value="year"
        />
      </el-select>

      <el-row :gutter="20" class="mg-t-20">
        <el-col :span="16">
          <el-card
            class="dp-inline-block mg-b-20 mg-r-20"
            style="width: 250px;"
          >
            <p>累计营收（每日0点更新）</p>
            <p>
              <span class="f-s-20">{{ allTotal }}</span>
              元
            </p>
            <el-divider />
            <p class="t-a-right gray">线上：{{ total }} 元</p>
            <p class="t-a-right gray">线下：{{ offlineTotal }} 元</p>
          </el-card>
          <el-card
            class="dp-inline-block mg-b-20 mg-r-20"
            style="width: 250px;"
          >
            <p>年度营收</p>
            <p>
              <span class="f-s-20">{{ allYearTotal }}</span>
              元
            </p>
            <el-divider />
            <p class="t-a-right gray">线上：{{ yearTotal }} 元</p>
            <p class="t-a-right gray">线下：{{ offlineYearTotal }} 元</p>
          </el-card>
          <el-card
            class="dp-inline-block mg-b-20 mg-r-20"
            style="width: 250px;"
          >
            <p>本月营收</p>
            <p>
              <span class="f-s-20">{{ allMonthTotal }}</span>
              元
            </p>
            <el-divider />
            <p class="t-a-right gray">线上：{{ monthTotal }} 元</p>
            <p class="t-a-right gray">线下：{{ offlineMonthTotal }} 元</p>
          </el-card>
          <el-card>
            <canvas ref="chart" />
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card>
            <div slot="header" class="clearfix">
              <span>{{ filterYear }} 年线上营收占比</span>
            </div>
            <div v-if="projects && projects.length">
              <el-row
                v-for="(project, index) in projects"
                :key="index"
                :gutter="10"
                class="mg-b-20"
              >
                <el-col :span="8">
                  {{ project.name }}
                  <el-tooltip
                    v-if="project.tooltip"
                    :content="project.tooltip"
                    placement="top"
                  >
                    <i class="el-icon-question question" />
                  </el-tooltip>
                </el-col>
                <el-col :span="8">
                  {{ project.amount }}
                </el-col>
                <el-col :span="8"> {{ project.percent }}% </el-col>
                <div v-if="project.subItems" class="clear pd-l-20 pd-t-10">
                  <el-row
                    v-for="(subItem, index2) in project.subItems"
                    :key="index2"
                    :gutter="10"
                    class="f-s-12 gray"
                  >
                    <el-col :span="8">
                      {{ subItem.name }}
                    </el-col>
                    <el-col :span="8">
                      {{ subItem.amount }}
                    </el-col>
                    <el-col :span="8"> {{ subItem.percent }}% </el-col>
                  </el-row>
                </div>
              </el-row>
            </div>
            <div v-else class="t-a-center">
              暂无数据
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="mg-t-20">
      <div slot="header" class="clearfix">
        <span>营收报表</span>
      </div>
      <div>
        <el-select
          v-model="filterType"
          placeholder="请选择"
          size="small"
          style="width: 200px;"
          @change="doSearch"
        >
          <el-option label="推广佛事" :value="1" />
          <el-option label="转单系统" :value="4" />
          <el-option label="增值服务 - 实景探寺" :value="2" />
          <el-option label="增值服务 - 微供奉" :value="3" />
          <el-option label="法师祈福" :value="5" />
          <el-option label="分销推广" :value="7" />
          <el-option label="文章打赏" :value="8" />
          <el-option label="千寺祈福" :value="9" />
          <el-option label="日行一善" :value="10" />
          <el-option label="自营佛事" :value="11" />
          <el-option label="自动转单" :value="12" />
          <el-option label="禅在订单" :value="13" />
        </el-select>
        <el-date-picker
          v-model="filterStartDate"
          align="right"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="开始日期"
          size="small"
          style="width: 200px;"
          @change="doSearch"
        />
        <el-date-picker
          v-model="filterEndDate"
          align="right"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="结束日期"
          size="small"
          style="width: 200px;"
          @change="doSearch"
        />
        <div v-show="[1, 4, 11].indexOf(filterType) > -1" class="fl-right">
          <el-button
            size="small"
            plain
            :type="filterDimension === 2 ? 'primary' : 'default'"
            @click="changeDimension(2)"
          >
            项目维度
          </el-button>
          <el-button
            size="small"
            plain
            :type="filterDimension === 1 ? 'primary' : 'default'"
            @click="changeDimension(1)"
          >
            寺院维度
          </el-button>
        </div>
        <div class="fl-right">
          <el-button
            size="small"
            plain
            type="default"
            style="margin-right: 10px"
            @click="downloadExcel"
          >
            下载全部Excel
          </el-button>
        </div>
      </div>
      <!-- 推广佛事 + 项目维度 -->
      <div v-if="filterType === 1 && filterDimension === 2" class="body">
        <el-table v-loading="loading" :data="list" style="width: 100%">
          <el-table-column prop="foShiNameWithId" label="佛事名称" />
          <el-table-column prop="templeName" label="寺院名称" />
          <el-table-column prop="amount" label="佛事金额（元）" />
          <el-table-column prop="profit" label="营收金额（元）" />
        </el-table>
      </div>
      <!-- 推广佛事 + 寺院维度 -->
      <div v-else-if="filterType === 1 && filterDimension === 1" class="body">
        <el-table v-loading="loading" :data="list" style="width: 100%">
          <el-table-column prop="templeName" label="寺院名称" />
          <el-table-column prop="amount" label="佛事金额（元）" />
          <el-table-column prop="profit" label="营收金额（元）" />
        </el-table>
      </div>
      <!-- 转单系统 + 项目维度 -->
      <div v-else-if="filterType === 4 && filterDimension === 2" class="body">
        <el-table v-loading="loading" :data="list" style="width: 100%">
          <el-table-column prop="foShiNameWithId" label="佛事名称" />
          <el-table-column prop="amount" label="订单金额（元）" />
          <el-table-column prop="profit" label="营收金额（元）" />
        </el-table>
      </div>
      <!-- 转单系统 + 寺院维度 -->
      <div v-else-if="filterType === 4 && filterDimension === 1" class="body">
        <el-table v-loading="loading" :data="list" style="width: 100%">
          <el-table-column prop="templeName" label="寺院名称" />
          <el-table-column prop="amount" label="佛事金额（元）" />
          <el-table-column prop="profit" label="营收金额（元）" />
        </el-table>
      </div>
      <!-- 实景探寺 -->
      <div v-else-if="filterType === 2" class="body">
        <el-table v-loading="loading" :data="list" style="width: 100%">
          <el-table-column prop="templeName" label="寺院名称" />
          <el-table-column label="支付服务费">
            <template slot-scope="item">
              {{ item.row.chargeRate }}%
            </template>
          </el-table-column>
          <el-table-column prop="amount" label="订单金额（元）" />
          <el-table-column prop="profit" label="营收金额（元）" />
          <el-table-column prop="yueGuangBaoHe" label="月光宝盒（元）" />
          <el-table-column prop="manualRecord" label="人工记录（元）" />
        </el-table>
      </div>
      <!-- 微供奉 -->
      <div v-else-if="filterType === 3" class="body">
        <el-table v-loading="loading" :data="list" style="width: 100%">
          <el-table-column prop="templeName" label="寺院名称" />
          <el-table-column label="支付服务费">
            <template slot-scope="item">
              {{ item.row.chargeRate }}%
            </template>
          </el-table-column>
          <el-table-column prop="amount" label="订单金额（元）" />
          <el-table-column prop="profit" label="营收金额（元）" />
          <el-table-column prop="manualRecord" label="人工记录（元）" />
        </el-table>
      </div>
      <!-- 法师祈福 -->
      <div v-else-if="filterType === 5" class="body">
        <el-table v-loading="loading" :data="list" style="width: 100%">
          <el-table-column prop="time" label="时间" />
          <el-table-column prop="orderCount" label="完成订单数量" />
          <el-table-column prop="amount" label="订单金额（元）" />
          <el-table-column prop="faShiProfit" label="法师收益金额（元）" />
          <el-table-column prop="profit" label="营收金额（元）" />
        </el-table>
      </div>
      <!-- 分销推广 -->
      <div v-else-if="filterType === 7" class="body">
        <el-table v-loading="loading" :data="list" style="width: 100%">
          <el-table-column prop="templeName" label="寺院名称" />
          <el-table-column prop="amount" label="佛事金额（元）" />
          <el-table-column prop="profit" label="营收金额（元）" />
        </el-table>
      </div>
      <!-- 文章打赏 -->
      <div v-else-if="filterType === 8" class="body">
        <el-table v-loading="loading" :data="list" style="width: 100%">
          <el-table-column prop="templeName" label="寺院名称" />
          <el-table-column prop="profit" label="营收金额（元）" />
        </el-table>
      </div>
      <!-- 千寺祈福 -->
      <div v-else-if="filterType === 9" class="body">
        <el-table v-loading="loading" :data="list" style="width: 100%">
          <el-table-column prop="time" label="时间" />
          <el-table-column prop="orderCount" label="订单数量" />
          <el-table-column prop="amount" label="订单金额（元）" />
          <el-table-column prop="profit" label="营收金额（元）" />
        </el-table>
      </div>
      <!-- 日行一善 -->
      <div v-else-if="filterType === 10" class="body">
        <el-table v-loading="loading" :data="list" style="width: 100%">
          <el-table-column prop="time" label="时间" />
          <el-table-column prop="amount" label="订单金额（元）" />
          <el-table-column prop="profit" label="营收金额（元）" />
        </el-table>
      </div>
      <!-- 自营佛事 + 项目维度 -->
      <div v-else-if="filterType === 11 && filterDimension === 2" class="body">
        <el-table v-loading="loading" :data="list" style="width: 100%">
          <el-table-column prop="foShiNameWithId" label="佛事名称" />
          <el-table-column prop="typeText" label="项目类型" />
          <el-table-column prop="templeName" label="寺院名称" />
          <el-table-column prop="orderCount" label="订单数量" />
          <el-table-column prop="amount" label="佛事金额（元）" />
          <el-table-column prop="profit" label="营收金额（元）" />
        </el-table>
      </div>
      <!-- 自营佛事 + 寺院维度 -->
      <div v-else-if="filterType === 11 && filterDimension === 1" class="body">
        <el-table v-loading="loading" :data="list" style="width: 100%">
          <el-table-column prop="templeName" label="寺院名称" />
          <el-table-column prop="orderCount" label="订单数量" />
          <el-table-column prop="amount" label="佛事金额（元）" />
          <el-table-column prop="profit" label="营收金额（元）" />
        </el-table>
      </div>
      <!-- 自动转单 -->
      <div v-else-if="filterType === 12" class="body">
        <el-table v-loading="loading" :data="list" style="width: 100%">
          <el-table-column prop="foShiNameWithId" label="佛事名称" />
          <el-table-column prop="amount" label="佛事金额（元）" />
          <el-table-column prop="profit" label="营收金额（元）" />
        </el-table>
      </div>
      <!-- 禅在订单 -->
      <div v-else-if="filterType === 13" class="body">
        <el-table v-loading="loading" :data="list" style="width: 100%">
          <el-table-column prop="foShiNameWithId" label="佛事名称" />
          <el-table-column prop="amount" label="佛事金额（元）" />
          <el-table-column prop="profit" label="营收金额（元）" />
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';
import Chart from 'chart.js';
import { now, dateByInterval } from '../../../../pro-com/src/utils';
import { makeChartConfig, makeChartTitle } from './util';
import './fetch';

let chart;

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
      yearList: [],
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
        onlineData: this.yearList,
        offlineData: this.offlineYearList,
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
          this.yearList = res.yearList;
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
</script>

<style scoped>
.container {
  width: 100%;
  padding: 40px 20px;
}

.body {
  margin-top: 20px;
}

.question {
  margin-left: 5px;
  position: relative;
  top: 2px;
  cursor: pointer;
  font-size: 20px;
}
</style>
