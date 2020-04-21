<template>
  <div class="container">
    <el-card>
      <div class="clearfix">
        <el-select
          v-model="filterExpire"
          placeholder="请选择"
          size="small"
          style="width: 200px;"
          filterable
          @change="doSearch"
        >
          <el-option label="未过期" :value="1" />
          <el-option label="已过期" :value="0" />
        </el-select>
        <el-button class="fl-right" size="small" @click="toAdd">
          添加弹窗
        </el-button>
      </div>
      <div class="body">
        <el-table v-loading="loading" :data="list" style="width: 100%">
          <el-table-column prop="id" label="弹窗ID" />
          <el-table-column prop="title" label="标题" />
          <el-table-column label="图片（点击放大）">
            <template slot-scope="item">
              <el-image
                style="width: 100px; height: 100px"
                :src="item.row.cover"
                :preview-src-list="[item.row.cover]"
              />
            </template>
          </el-table-column>
          <el-table-column label="是否生效">
            <template slot-scope="item">
              <span v-if="item.row.timeStatus === 1" class="green">生效中</span>
              <span v-else-if="item.row.timeStatus === 2" class="orange"
                >未生效</span
              >
              <span v-else-if="item.row.timeStatus === 3" class="gray"
                >已过期</span
              >
            </template>
          </el-table-column>
          <el-table-column prop="title" label="点击/关闭数">
            <template slot-scope="item">
              {{ item.row.clickCount }}/{{ item.row.closeCount }}
            </template>
          </el-table-column>
          <el-table-column prop="sort" label="优先级" />
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
      filterExpire: 0,
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

      seeFetch('promo/pay-pop/list', {
        expire: this.filterExpire,
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
        this.$store.state.financeRemark.add[name] =
          typeof defaultValue === 'function' ? defaultValue() : defaultValue;
      });

      this.$store.state.financeRemark.add.dialogTitle = '添加';
      this.$store.state.financeRemark.add.isUpdate = !1;
      this.$store.state.financeRemark.add.updateId = 0;
      this.$store.state.financeRemark.add.visible = !0;
    },
    toEdit({ row: item }) {
      addProps.forEach(({ name }) => {
        this.$store.state.financeRemark.add[name] = item[name];
      });

      this.$store.state.financeRemark.add.dialogTitle = '编辑';
      this.$store.state.financeRemark.add.visible = !0;
      this.$store.state.financeRemark.add.isUpdate = !0;
      this.$store.state.financeRemark.add.updateId = item.id;
    },
    toDelete({ row: item }) {
      this.$confirm('确定删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        seeFetch('promo/pay-pop/delete', { id: item.id }).then(res => {
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
