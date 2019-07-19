<template>
  <div class="container">
    <el-card>
      <div class="clearfix">
        <span class="l-hg-32"> 搜索 </span>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-input
          v-model="search"
          placeholder="请输入关键字搜索"
          size="small"
          style="width: 250px"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="doSearch"
          /> </el-input
        >&nbsp;&nbsp;&nbsp;&nbsp;
        <span class="l-hg-32"> 分组 </span>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-select
          v-model="filterGroup"
          placeholder="请选择"
          size="small"
          style="width: 200px;"
          @change="doSearch"
        >
          <el-option :value="0" label="全部" />
          <el-option
            v-for="group in groupList"
            :key="group.id"
            :value="group.id"
            :label="group.name"
          />
        </el-select>
        <el-button size="small" @click="toGroup">
          管理分组
        </el-button>
        <el-button class="fl-right" size="small" @click="toAdd">
          添加
        </el-button>
      </div>
      <div class="body">
        <el-table v-loading="loading" :data="list" style="width: 100%">
          <el-table-column prop="id" label="id" />
          <el-table-column prop="name" label="公众号名称" />
          <el-table-column label="分组">
            <template slot-scope="item">
              <el-select
                v-model="item.row.groupId"
                placeholder="请选择"
                size="small"
                @change="value => changeGroup(value, item)"
              >
                <el-option :value="0" label="分组名称" />
                <el-option
                  v-for="group in groupList"
                  :key="group.id"
                  :value="group.id"
                  :label="group.name"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="account" label="微信号" />
          <el-table-column prop="interval" label="拉取间隔天数" />
          <el-table-column prop="lastPullTime" label="最近拉取时间" />
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
    <Group />
  </div>
</template>

<script>
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';
import { addProps } from './data';
import Add from './Add';
import Group from './Group';
import './fetch';

const computedProps = {};

['groupList'].forEach(name => {
  computedProps[name] = {
    get() {
      return this.$store.state.quSource[name];
    },
    set(value) {
      this.$store.state.quSource[name] = value;
    },
  };
});

export default {
  name: 'App',
  components: {
    Add,
    Group,
  },
  data() {
    return {
      search: '',
      filterGroup: 0,
      loading: !0,
      currentPage: 1,
      totalCount: 0,
      list: [],
    };
  },
  computed: {
    ...computedProps,
  },
  created() {
    this.fetchList();
    this.fetchGroupList();
  },
  methods: {
    fetchList() {
      this.loading = !0;

      seeFetch('qu/source/list', {
        search: this.search,
        groupId: this.filterGroup,
        page: this.currentPage,
      }).then(res => {
        if (!res.success) {
          Notification({
            title: '提示',
            message: res.message,
          });
          return;
        }

        this.loading = !1;
        this.totalCount = res.totalCount;
        this.list = res.data;

        window.scrollTo(0, 0);
      });
    },
    fetchGroupList() {
      seeFetch('qu/source/groupList').then(res => {
        if (!res.success) return;

        if (res.data && res.data.length) this.groupList = res.data;
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
        this.$store.state.quSource.add[name] =
          typeof defaultValue === 'function' ? defaultValue() : defaultValue;
      });

      this.$store.state.quSource.add.dialogTitle = '添加';
      this.$store.state.quSource.add.isUpdate = !1;
      this.$store.state.quSource.add.updateId = 0;
      this.$store.state.quSource.add.visible = !0;
    },
    toEdit({ row: item }) {
      addProps.forEach(({ name }) => {
        this.$store.state.quSource.add[name] = item[name];
      });

      this.$store.state.quSource.add.dialogTitle = '编辑';
      this.$store.state.quSource.add.visible = !0;
      this.$store.state.quSource.add.isUpdate = !0;
      this.$store.state.quSource.add.updateId = item.id;
    },
    toDelete({ row: item }) {
      this.$confirm('确定删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        seeFetch('qu/source/delete', { id: item.id }).then(res => {
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
    toGroup() {
      this.$store.state.quSource.groupDialogVisible = !0;
    },
    changeGroup(value, { row: item }) {
      seeFetch('qu/source/addToGroup', { id: item.id, groupId: value }).then(
        res => {
          if (!res.success) {
            Notification({
              title: '提示',
              message: res.message,
            });
            // 因为值已经改变，需要刷新列表回复到原来的值
            this.fetchList();
            return;
          }

          Notification({
            title: '提示',
            message: '更新成功',
          });
        }
      );
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
