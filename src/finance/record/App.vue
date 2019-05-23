<template>
  <div class="container">
    <el-card>
      <el-alert
        title="因和统计有数据关联性，记录时请确保数据准确无误"
        type="warning"
      />
      <div class="clearfix mg-t-20">
        <el-select
          v-model="filterTemple"
          placeholder="请选择"
          size="small"
          style="width: 200px;"
          filterable
          @change="doSearch"
        >
          <el-option label="全部" :value="0" />
          <el-option
            v-for="item in temples"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <el-button class="fl-right" size="small" @click="toAdd">
          添加一笔帐目
        </el-button>
      </div>
      <div class="body">
        <el-table v-loading="loading" :data="list" style="width: 100%">
          <el-table-column prop="recordName" label="记录名称" />
          <el-table-column prop="incomeFrom" label="盈收来源" />
          <el-table-column prop="relatedItem" label="相关模块" />
          <el-table-column prop="income" label="盈收金额/元" />
          <el-table-column prop="incomeTime" label="入账时间" />
          <el-table-column prop="editUser" label="编辑用户" />
          <el-table-column label="操作">
            <template slot-scope="item">
              <el-button type="text" size="small" @click="toEdit(item)">
                编辑
              </el-button>
              <el-button type="text" size="small" @click="toDelete(item)">
                删除
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
    </el-card>
    <Add :ok="doSearch" />
  </div>
</template>

<script>
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';
import { addProps } from './data';
import Add from './Add';
import './fetch';

export default {
  name: 'App',
  components: {
    Add,
  },
  data() {
    return {
      loading: !0,
      filterTemple: 0,
      currentPage: 1,
      totalCount: 0,
      list: [],
      temples: [],
    };
  },
  created() {
    seeFetch('finance/record/temples').then(res => {
      this.temples = res.data || [];
    });

    this.fetchList();
  },
  methods: {
    fetchList() {
      this.loading = !0;

      seeFetch('finance/record/list', {
        templeId: this.filterTemple,
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
    toAdd() {
      addProps.forEach(({ name, default: defaultValue }) => {
        this.$store.state.financeRecord.add[name] =
          typeof defaultValue === 'function' ? defaultValue() : defaultValue;
      });

      this.$store.state.financeRecord.add.dialogTitle = '添加';
      this.$store.state.financeRecord.add.isUpdate = !1;
      this.$store.state.financeRecord.add.updateId = 0;
      this.$store.state.financeRecord.add.visible = !0;
    },
    toEdit({ row: item }) {
      addProps.forEach(({ name }) => {
        this.$store.state.financeRecord.add[name] = item[name];
      });

      this.$store.state.financeRecord.add.dialogTitle = '编辑';
      this.$store.state.financeRecord.add.visible = !0;
      this.$store.state.financeRecord.add.isUpdate = !0;
      this.$store.state.financeRecord.add.updateId = item.id;
    },
    toDelete({ row: item }) {
      this.$confirm('确定删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        seeFetch('finance/record/delete', { id: item.id }).then(res => {
          if (!res.success) {
            Notification({
              title: '提示',
              message: res.message,
            });
            return;
          }

          Notification({
            title: '提示',
            message: '删除成功',
          });

          this.fetchList();
        });
      });
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
