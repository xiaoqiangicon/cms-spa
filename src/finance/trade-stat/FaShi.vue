<template>
  <div class="container">
    <el-card>
      <div class="clearfix">
        <span class="l-hg-32">开始时间</span>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-date-picker
          v-model="startDate"
          align="right"
          type="date"
          value-format="yyyy-MM-dd"
          size="small"
          style="width: 150px;"
          @change="doSearch"
        />&nbsp;&nbsp;&nbsp;&nbsp;
        <span class="l-hg-32">结束时间</span>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-date-picker
          v-model="endDate"
          align="right"
          type="date"
          value-format="yyyy-MM-dd"
          size="small"
          style="width: 150px;"
          @change="doSearch"
        />
        <el-button class="fl-right" size="small" @click="toExport">
          导出Excel
        </el-button>
      </div>
      <div class="body">
        <el-table v-loading="loading" :data="list" style="width: 100%">
          <el-table-column prop="orderNum" label="订单号" />
          <el-table-column prop="wx_openid" label="wx_openid" />
          <el-table-column label="姓名">
            <template slot-scope="item">
              {{ item.row.userName ? item.row.userName.replace(',', '') : '' }}
            </template>
          </el-table-column>
          <el-table-column prop="amount" label="金额（元）" />
          <el-table-column prop="createdAt" label="时间" />
        </el-table>
        <el-pagination
          :total="totalCount"
          :current-page="currentPage"
          background
          layout="prev, pager, next"
          style="margin-top: 40px"
          @current-change="pageChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';
import './fetch';

export default {
  name: 'FaShi',
  data() {
    return {
      loading: !0,
      startDate: '',
      endDate: '',
      currentPage: 1,
      totalCount: 0,
      list: [],
    };
  },
  created() {
    this.fetchList();
  },
  methods: {
    fetchList() {
      this.loading = !0;

      seeFetch('finance/trade-stat/faShiList', {
        startDate: this.startDate,
        endDate: this.endDate,
        page: this.currentPage,
      }).then(res => {
        this.loading = !1;

        if (!res.success) {
          Notification({
            title: '提示',
            message: res.message,
          });
          return;
        }

        if (this.currentPage === 1) this.totalCount = res.totalCount;
        this.list = res.data;

        window.scrollTo(0, 0);
      });
    },
    pageChange(page) {
      this.currentPage = page;
      this.fetchList();
    },
    doSearch() {
      this.currentPage = 1;
      this.fetchList();
    },
    toExport() {
      const { startDate, endDate } = this;
      window.location.href = `/wish/downWishOrderExcel?startTime=${startDate}&endTime=${endDate}&type=1`;
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
