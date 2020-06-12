<template>
  <div class="contain">
    <div class="search">
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
      <el-button type="primary" @click="download">
        导出
      </el-button>
    </div>
    <el-card>
      <el-table
        v-loading="loading"
        :data="list"
        style="width: 100%"
        @sort-change="sortChange"
      >
        <el-table-column prop="statisticsTime" label="时间" :align="'center'" />
        <el-table-column
          sortable="custom"
          prop="visitNum"
          label="访问人次"
          :align="'center'"
        />
        <el-table-column
          sortable="custom"
          prop="payHumanNum"
          label="付款人数"
          :align="'center'"
        />
        <el-table-column
          sortable="custom"
          prop="payNum"
          label="付款笔数"
          :align="'center'"
        />
        <el-table-column
          sortable="custom"
          prop="payPriceSum"
          label="付款总金额"
          :align="'center'"
        />
        <el-table-column
          prop="ConversionRate"
          label="转化率"
          :align="'center'"
        />
        <el-table-column prop="ARPU" label="ARPU" :align="'center'" />
      </el-table>
      <el-pagination
        v-if="list.length"
        :total="totalCount"
        :current-page="currentPage"
        background
        layout="prev, pager, next"
        style="margin-top: 40px"
        @current-change="pageChange"
      />
    </el-card>
  </div>
</template>

<script>
import seeFetch from 'see-fetch';
import './fetch';

export default {
  data() {
    return {
      loading: !0,
      list: [],
      currentPage: 1,
      totalCount: 0,
      orderByType: 0,
      orderBySort: 0, // 1顺序，2倒序
      date: ['', ''],
      formatDate: ['', ''],
    };
  },
  created() {
    const { id } = this.$route.params;
    this.id = parseInt(id, 10);

    seeFetch('cooperation/projectDetail/list', {
      pageNumber: this.currentPage - 1,
      id: this.id,
    }).then(res => {
      if (res.errorCode === 0) {
        this.list = res.data;
        this.totalCount = this.list.length;
      }
      this.loading = !1;
    });
  },
  methods: {
    sortChange(row) {
      console.log(row);
      this.currentPage = 1;
      if (row.order === 'ascending') {
        this.orderBySort = 1;
      } else {
        this.orderBySort = 2;
      }

      if (row.prop === 'visitNum') {
        this.orderByType = 1;
      } else if (row.prop === 'payHumanNum') {
        this.orderByType = 2;
      } else if (row.prop === 'payNum') {
        this.orderByType = 3;
      } else if (row.prop === 'payPriceSum') {
        this.orderByType = 4;
      }

      this.fetchList();
    },
    fetchList() {
      this.loading = !0;
      seeFetch('cooperation/projectDetail/list', {
        id: this.id,
        pageNumber: this.currentPage - 1,
        startTime: this.formatDate[0],
        endTime: this.formatDate[1],
        orderByType: this.orderByType,
        orderBySort: this.orderBySort,
      }).then(res => {
        if (res.errorCode === 0) {
          this.list = res.data;
          this.totalCount = this.list.length;
        }
        this.loading = !1;
      });
    },
    pageChange(page) {
      this.currentPage = page;
      this.fetchList();
    },
    download() {
      window.location.href = `/stat/downloadCommodityExcel?startTime=${
        this.formatDate[0]
      }&endTime=${this.formatDate[1]}&commodityId=${this.id}`;
    },
    onChangeDatePicker() {
      const { date } = this;
      this.currentPage = 1;
      this.formatDate = date.map(item => this.formatTime(`${item}`));
      this.fetchList();
    },
    formatTime(timeStr) {
      const date = new Date(timeStr);
      const y = date.getFullYear();
      const m = date.getMonth() + 1;
      const d = date.getDate();

      return `${y}-${m >= 10 ? m : `0${m}`}-${d >= 10 ? d : `0${d}`}`;
    },
  },
};
</script>

<style lang="less" scoped>
.contain {
  padding: 20px;
  padding-top: 40px;
}
.search {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
</style>
