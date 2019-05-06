<template>
  <div class="container">
    <el-card>
      <div class="clearfix">
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
          添加备注
        </el-button>
      </div>
      <div class="body">
        <el-table v-loading="loading" :data="list" style="width: 100%">
          <el-table-column prop="content" label="备注内容" />
          <el-table-column prop="templeName" label="寺院名" />
          <el-table-column prop="editUser" label="编辑用户" />
          <el-table-column prop="publishTime" label="添加时间" />
          <el-table-column label="是否生效">
            <template slot-scope="item">
              <el-switch
                :value="!!item.row.takeEffect"
                active-text="是"
                inactive-text="否"
                @change="value => changeTakeEffect(value, item)"
              />
            </template>
          </el-table-column>
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
    seeFetch('finance/remark/temples').then(res => {
      this.temples = res.data || [];
    });

    this.fetchList();
  },
  methods: {
    fetchList() {
      this.loading = !0;

      seeFetch('finance/remark/list', {
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

        this.totalCount = res.totalCount;
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
        seeFetch('finance/remark/delete', { id: item.id }).then(res => {
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
    changeTakeEffect(value, { row: item }) {
      seeFetch('finance/remark/switch', {
        id: item.id,
        checked: value ? 1 : 0,
      }).then(res => {
        if (!res.success) {
          Notification({
            title: '提示',
            message: res.message || '操作失败',
          });
          return;
        }

        // eslint-disable-next-line no-param-reassign
        item.takeEffect = value ? 1 : 0;

        Notification({
          title: '提示',
          message: '修改成功',
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
