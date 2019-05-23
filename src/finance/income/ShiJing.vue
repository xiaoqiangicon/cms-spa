<template>
  <div class="container">
    <div class="body">
      <el-table v-loading="loading" :data="list" style="width: 100%">
        <el-table-column prop="templeId" label="寺院ID" />
        <el-table-column prop="templeName" label="寺院名称" />
        <el-table-column label="支付服务费">
          <template slot-scope="item">
            {{ item.row.serviceCharge }}%
          </template>
        </el-table-column>
        <el-table-column prop="takeEffectTime" label="生效时间" />
        <el-table-column prop="lastEditTime" label="最后编辑时间" />
        <el-table-column prop="lastEditUser" label="最后编辑用户" />
        <el-table-column label="操作">
          <template slot-scope="item">
            <el-button type="text" @click="toEdit(item)">
              编辑
            </el-button>
            <el-button type="text" @click="toRecords(item)">
              记录
            </el-button>
          </template>
        </el-table-column>
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
    <shi-jing-add :ok="addDialogOk" />
    <shi-jing-records />
  </div>
</template>

<script>
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';
import { shiJingAddProps, shiJingRecordsProps } from './data';
import ShiJingAdd from './ShiJingAdd';
import ShiJingRecords from './ShiJingRecords';
import './fetch';

export default {
  name: 'ShiJing',
  components: {
    ShiJingAdd,
    ShiJingRecords,
  },
  data() {
    return {
      loading: !0,
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
      seeFetch('finance/income/listShiJing', {
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
    toSearch() {
      this.currentPage = 1;
      this.fetchList();
    },
    toEdit({ row: item }) {
      shiJingAddProps.forEach(({ name }) => {
        this.$store.state.financeIncome.shiJingAdd[name] = item[name];
      });

      this.$store.state.financeIncome.shiJingAdd.dialogTitle = '编辑';
      this.$store.state.financeIncome.shiJingAdd.visible = !0;
      this.$store.state.financeIncome.shiJingAdd.isUpdate = !0;
      this.$store.state.financeIncome.shiJingAdd.updateId = item.id;
    },
    toRecords({ row: item }) {
      shiJingRecordsProps.forEach(({ name }) => {
        this.$store.state.financeIncome.shiJingRecords[name] = item[name];
      });

      this.$store.state.financeIncome.shiJingRecords.dialogTitle = '记录';
      this.$store.state.financeIncome.shiJingRecords.visible = !0;
      this.$store.state.financeIncome.shiJingRecords.isUpdate = !0;
      this.$store.state.financeIncome.shiJingRecords.updateId = item.id;
      this.$store.state.financeIncome.shiJingRecords.id = item.id;
    },
    addDialogOk() {
      this.fetchList();
    },
  },
};
</script>

<style lang="less" scoped>
.body {
  margin-top: 20px;
}
</style>
