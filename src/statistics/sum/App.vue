<template>
  <div class="container">
    <div class="search">
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
    </div>
    <el-table
      v-loading="loading"
      :data="list"
      :span-method="arraySpanMethod"
      style="width: 100%"
      border
    >
      <el-table-column prop="source" label="数据来源" :align="'center'" />
      <el-table-column prop="newUser" label="激活用户数" :align="'center'" />
      <el-table-column prop="registerUser" label="注册人数" :align="'center'" />
      <el-table-column prop="payUser" label="支付用户数" :align="'center'" />
      <el-table-column prop="payNum" label="支付笔数" :align="'center'" />
      <el-table-column
        prop="payTotalMoney"
        label="支付金额"
        :align="'center'"
      />
      <el-table-column
        prop="payMoreUser"
        label="多次支付人数"
        :align="'center'"
      />
      <el-table-column
        prop="payMoreMoney"
        label="多次支付金额"
        :align="'center'"
      />
    </el-table>
    <div class="flow">流水数据</div>
    <el-table v-loading="loading" :data="billList" style="width: 100%" border>
      <el-table-column prop="type" label="类型" :align="'center'" />
      <el-table-column prop="cnt" label="支付人数" :align="'center'" />
      <el-table-column prop="cnt2" label="支付单数" :align="'center'" />
      <el-table-column prop="money" label="金额" :align="'center'" />
    </el-table>
  </div>
</template>

<script>
import seeFetch from 'see-fetch';
import './fetch';

export default {
  data() {
    return {
      date: ['', ''],
      formatDate: ['', ''],
      loading: !1,
      list: [],
      billList: [],
    };
  },
  methods: {
    fetchList() {
      this.loading = !0;

      seeFetch('statistics/sum/list', {
        endTime: this.formatDate[1],
        startTime: this.formatDate[0],
      }).then(res => {
        this.loading = !1;
        this.list = res.data.list;
        this.billList = res.data.payMessageByType;
      });
    },
    onChangeDatePicker() {
      const { date } = this;
      this.formatDate = date.map(item => this.formatTime(`${item}`));
      this.fetchList();
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 3) {
        if (columnIndex === 0) {
          return [1, 8];
        } else if (columnIndex === 1) {
          return [0, 0];
        }
      }
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

<style scoped>
.container {
  width: 100%;
  padding: 40px 20px;
}
.search {
  margin-bottom: 30px;
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
