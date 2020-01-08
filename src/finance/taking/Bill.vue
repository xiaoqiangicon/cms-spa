<template>
  <el-dialog
    :visible="visible"
    title="人工记账列表"
    :before-close="clickCancel"
    width="60%"
  >
    <div class="content">
      <div class="">
        <el-button style="margin-top: -18px;" @click="addBill">
          添加一笔
        </el-button>
      </div>
      <el-table v-loading="loading" :data="list" style="width: 100%">
        <el-table-column prop="recordName" label="记录名称" />
        <el-table-column label="相关模块" prop="relatedItem" />
        <el-table-column prop="income" label="盈收金额/元" />
        <el-table-column prop="incomeTime" label="入账时间" />
        <el-table-column prop="editUser" label="编辑用户" />
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
  </el-dialog>
</template>

<script>
import seeFetch from 'see-fetch';

export default {
  data() {
    return {
      list: [],
      loading: !0,
      currentPage: 1,
      totalCount: 0,
    };
  },
  computed: {
    visible() {
      return this.$store.state.financeTaking.showBillList;
    },
  },
  created() {
    this.fetchList();
  },
  methods: {
    fetchList() {
      this.loading = !0;

      seeFetch('finance/taking/list', {
        templeId: this.filterTemple,
        type: this.filterType,
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
      });
    },
    pageChange(page) {
      this.currentPage = page;
      this.fetchList();
    },
    addBill() {
      this.$store.state.financeTaking.showBillList = !1;
      this.$store.state.financeTaking.showAddBill = !0;
    },
    clickCancel() {
      this.$store.state.financeTaking.showBillList = !1;
    },
  },
};
</script>

<style lang="less" scoped></style>
