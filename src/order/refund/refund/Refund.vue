<template>
  <el-card>
    <div>
      <el-date-picker
        v-if="!1"
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
        v-if="!1"
        v-model="filterEndDate"
        align="right"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="结束日期"
        size="small"
        style="width: 200px;"
        @change="doSearch"
      />
      <el-input
        v-model="filterWxTransactionId"
        placeholder="外部订单号搜索"
        size="small"
        style="width: 250px"
      >
        <el-button slot="append" icon="el-icon-search" @click="doSearch" />
      </el-input>
      <el-input
        v-model="filterSearch"
        placeholder="善缘号搜索"
        class="fl-right"
        size="small"
        style="width: 250px"
      >
        <el-button slot="append" icon="el-icon-search" @click="doSearch" />
      </el-input>
    </div>
    <div class="body">
      <el-table v-loading="loading" :data="list" style="width: 100%">
        <el-table-column label="来源" :align="'center'">
          <template slot-scope="scope">
            <div>{{ scope.row.fromTypeText }}</div>
            <div>发起账户：{{ scope.row.refundName }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="佛事名称" :align="'center'" />
        <el-table-column
          prop="subdivideName"
          label="选择项名称"
          :align="'center'"
        />
        <el-table-column prop="orderNo" label="订单号" :align="'center'" />
        <el-table-column prop="templeName" label="订单寺院" :align="'center'" />
        <el-table-column prop="area" label="分管大区" :align="'center'" />
        <el-table-column prop="amount" label="金额" :align="'center'" />
        <el-table-column prop="payTime" label="支付时间" :align="'center'" />
        <el-table-column
          prop="applicationTime"
          label="用户申请退款时间"
          :align="'center'"
        />
        <el-table-column
          prop="refundTime"
          label="财务确认退款时间"
          :align="'center'"
        />
        <el-table-column label="订单处理" :align="'center'">
          <template slot-scope="scope">
            <span class="orange">{{
              scope.row.isFinish === 1 ? '已处理' : '处理中'
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" :align="'center'">
          <template slot-scope="item">
            <el-button size="small" @click="toDetail(item)">
              订单详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :total="total"
        :current-page="page"
        background
        layout="prev, pager, next"
        style="margin-top: 40px"
        @current-change="pageChange"
      />
    </div>
  </el-card>
</template>

<script>
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';

export default {
  data() {
    return {
      filterStartDate: '',
      filterEndDate: '',
      filterSearch: '',
      filterWxTransactionId: '',
      loading: !0,
      page: 1,
      total: 0,
      list: [],
    };
  },
  created() {
    this.fetchList();
  },
  methods: {
    fetchList() {
      this.loading = !0;

      seeFetch('order/refund/list', {
        startDate: this.filterStartDate,
        endDate: this.filterEndDate,
        search: this.filterSearch,
        wxTransactionId: this.filterWxTransactionId,
        page: this.page,
      }).then(res => {
        if (!res.success) {
          Notification({
            title: '提示',
            message: res.message,
          });
          return;
        }

        this.loading = !1;

        if (this.page === 1) this.total = res.total;

        this.list = res.data;

        window.scrollTo(0, 0);
      });
    },
    pageChange(page) {
      this.page = page;
      this.fetchList();
    },
    doSearch() {
      this.page = 1;
      this.fetchList();
    },
    toDetail({ row: item }) {
      this.$store.state.orderRefund.detailVisible = !0;
      this.$store.state.orderRefund.detailItem = item;
    },
  },
};
</script>

<style lang="less" scoped>
.body {
  margin-top: 20px;
}
</style>
