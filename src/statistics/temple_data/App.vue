<template>
  <div class="container">
    <div class="search">
      <div>
        <span class="search-title">选择时间</span>
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
        <el-select v-model="type" size="small" filterable @change="refresh">
          <el-option
            v-for="item in typeList"
            :key="item.type"
            :label="item.name"
            :value="item.type"
          />
        </el-select>
      </div>
      <div>
        <el-button type="primary" @click="download">导出</el-button>
      </div>
    </div>
    <el-table v-loading="loading" :data="list" style="width: 100%" border>
      <el-table-column prop="templeId" label="寺院ID" :align="'center'" />
      <el-table-column prop="templeName" label="寺院名称" :align="'center'" />
      <el-table-column
        prop="websiteVisit"
        label="微站访问量"
        sortable
        :align="'center'"
      />
      <el-table-column prop="payUser" label="支付用户数" :align="'center'" />
      <el-table-column prop="payNum" label="支付笔数" :align="'center'" />
      <el-table-column prop="payMoney" label="支付金额" :align="'center'" />
    </el-table>
  </div>
</template>

<script>
import seeFetch from 'see-fetch';
import './fetch';
import { Notification } from 'element-ui';

export default {
  data() {
    return {
      date: ['', ''],
      formatDate: ['', ''],
      type: -1,
      typeList: [
        { name: '全部', type: -1 },
        { name: '微信', type: 0 },
        { name: 'APP', type: 1 },
      ],
      loading: !1,
      list: [],
    };
  },
  methods: {
    fetchList() {
      this.loading = !0;

      seeFetch('statistics/temple_data/list', {
        endTime: this.formatDate[1],
        startTime: this.formatDate[0],
        type: this.type,
      }).then(res => {
        this.loading = !1;
        this.list = res.data;
      });
    },
    onChangeDatePicker() {
      const { date } = this;
      this.formatDate = date.map(item => this.formatTime(`${item}`));
      this.fetchList();
    },
    refresh() {
      this.fetchList();
    },
    download() {
      if (!this.formatDate[1]) {
        Notification({
          title: '提示',
          message: `请选择时间`,
        });

        return;
      }
      window.open(
        '/stat/downloadTempleExcel/?startDate=' +
          this.formatDate[0] +
          '&endDate=' +
          this.formatDate[1]
      );
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

<style>
.el-select {
  height: 36px;
  margin-left: 20px;
}
.el-input--small .el-input__inner {
  height: 36px;
  line-height: 36px;
}
</style>

<style scoped>
.container {
  width: 100%;
  padding: 40px 20px;
}
.search {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  padding-right: 50px;
}
.search-title {
  font-size: 16px;
  margin-right: 20px;
  font-weight: bold;
}
.flow {
  margin: 40px 0 10px;
  font-size: 16px;
  font-weight: bold;
}
</style>
