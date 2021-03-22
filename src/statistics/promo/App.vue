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
    <el-table v-loading="loading" :data="list" style="width: 100%" border>
      <el-table-column prop="channel" label="渠道" :align="'center'" />
      <el-table-column
        prop="activationPeopleNum"
        label="激活人数"
        :align="'center'"
      />
      <el-table-column
        prop="registerPeopleNum"
        label="注册人数"
        :align="'center'"
      />
      <el-table-column
        prop="registerFirstPayPeopleNum"
        label="注册且首次支付人数"
        :align="'center'"
      />
      <el-table-column
        prop="registerFirstPayPrice"
        label="注册且首次支付金额"
        :align="'center'"
      />
      <el-table-column
        prop="registerPayNum"
        label="注册且支付人数"
        :align="'center'"
      />
      <el-table-column
        prop="registerPayPrice"
        label="注册且支付金额"
        :align="'center'"
      />
      <el-table-column
        prop="firstPayPeopleNum"
        label="首次支付人数"
        :align="'center'"
      />
      <el-table-column
        prop="firstPayPrice"
        label="首次支付金额"
        :align="'center'"
      />
      <el-table-column
        prop="PayPeopleNum"
        label="总支付人数"
        :align="'center'"
      />
      <el-table-column prop="PayPrice" label="总支付金额" :align="'center'" />
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
    };
  },
  methods: {
    fetchList() {
      this.loading = !0;

      seeFetch('statistics/promo/list', {
        endTime: this.formatDate[1],
        startTime: this.formatDate[0],
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
