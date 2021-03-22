<template>
  <div class="container">
    <div class="body">
      <el-table v-loading="loading" :data="list" style="width: 100%">
        <el-table-column prop="name" label="项目名称" />
        <el-table-column prop="money" label="总金额" />
        <el-table-column prop="companyMoney" label="留存金额" />
        <el-table-column label="可用金额">
          <template slot-scope="item">
            {{
              (
                item.row.money -
                item.row.companyMoney -
                item.row.expenditure
              ).toFixed(2)
            }}
          </template>
        </el-table-column>
        <el-table-column prop="expenditure" label="支出" />
        <el-table-column label="留存比例">
          <template slot-scope="item">
            {{ item.row.proportion }}%
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="item">
            <el-button type="text" @click="toEdit(item)">
              编辑
            </el-button>
            <el-button type="text" @click="toModifyRecords(item)">
              修改记录
            </el-button>
            <el-button type="text" @click="toUse(item)">
              支出
            </el-button>
            <el-button type="text" @click="toUseRecords(item)">
              支出记录
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
    <KindAdd :ok="fetchList" />
    <KindUse :ok="fetchList" />
    <kindModifyRecords />
    <kindUseRecords />
  </div>
</template>

<script>
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';
import './fetch';
import KindUse from './KindUse';
import kindUseRecords from './KindUseRecord.vue';
import KindAdd from './KindAdd';
import kindModifyRecords from './kindModifyRecords';

import {
  kindUseProps,
  kindUse,
  kindAddProps,
  kindModifyRecordsProps,
} from './data';

export default {
  name: 'kind',
  components: {},
  data() {
    return {
      loading: !0,
      currentPage: 1,
      totalCount: 0,
      list: [],
    };
  },
  components: {
    KindUse,
    kindUseRecords,
    KindAdd,
    kindModifyRecords,
  },
  created() {
    this.fetchList();
  },
  methods: {
    fetchList() {
      this.loading = !0;
      seeFetch('finance/income/getProjectList', {
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
        console.log(res.data, 'res.data');
        this.list = [res.data];
        // if (this.currentPage === 1) this.totalCount = res.totalCount;
        // this.list = res.data;

        window.scrollTo(0, 0);
      });
    },
    pageChange(page) {
      this.currentPage = page;
      this.fetchList();
    },
    toEdit({ row: item }) {
      kindAddProps.forEach(({ name }) => {
        this.$store.state.financeIncome.kindAdd[name] = item[name];
      });

      this.$store.state.financeIncome.kindAdd.dialogTitle = '编辑';
      this.$store.state.financeIncome.kindAdd.visible = !0;
      this.$store.state.financeIncome.kindAdd.isUpdate = !0;
      this.$store.state.financeIncome.kindAdd.updateId = item.id;
      this.$store.state.financeIncome.kindAdd.statisticsId = item.id;
    },
    toModifyRecords({ row: item }) {
      kindModifyRecordsProps.forEach(({ name }) => {
        this.$store.state.financeIncome.kindModifyRecords[name] = item[name];
      });

      this.$store.state.financeIncome.kindModifyRecords.dialogTitle =
        '修改记录';
      this.$store.state.financeIncome.kindModifyRecords.visible = !0;
      this.$store.state.financeIncome.kindModifyRecords.isUpdate = !0;
      this.$store.state.financeIncome.kindModifyRecords.updateId = item.id;
      this.$store.state.financeIncome.kindModifyRecords.id = item.id;
      this.$store.state.financeIncome.kindModifyRecords.statisticsId = item.id;
    },
    toUse({ row: item }) {
      kindUseProps.forEach(({ name }) => {
        this.$store.state.financeIncome.kindUse[name] = item[name];
      });

      this.$store.state.financeIncome.kindUse.dialogTitle = '添加支出项';
      this.$store.state.financeIncome.kindUse.visible = !0;
      this.$store.state.financeIncome.kindUse.isUpdate = !0;
      this.$store.state.financeIncome.kindUse.updateId = item.id;
      this.$store.state.financeIncome.kindUse.statisticsId = item.id;
      this.$store.state.financeIncome.kindUse.item = { ...item };
    },
    toUseRecords({ row: item }) {
      kindUseProps.forEach(({ name }) => {
        this.$store.state.financeIncome.kindUseRecords[name] = item[name];
      });

      this.$store.state.financeIncome.kindUseRecords.dialogTitle = '支出记录';
      this.$store.state.financeIncome.kindUseRecords.visible = !0;
      this.$store.state.financeIncome.kindUseRecords.isUpdate = !0;
      this.$store.state.financeIncome.kindUseRecords.updateId = item.id;
      this.$store.state.financeIncome.kindUseRecords.id = item.id;
      this.$store.state.financeIncome.kindUseRecords.statisticsId = item.id;
      console.log('this.$store.state', this.$store);
    },
  },
};
</script>

<style lang="less" scoped></style>
