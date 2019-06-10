<template>
  <div class="container">
    <el-card>
      <div class="clearfix">
        <el-button
          class="fl-right"
          size="small"
          @click="toAdd"
        >
          添加
        </el-button>
      </div>
      <div class="body">
        <el-table
          v-loading="loading"
          :data="list"
          style="width: 100%"
        >
          <el-table-column
            prop="item"
            label="表情图"
          >
            <template slot-scope="item">
              <img
                :src="item.row.cover"
                class="wd-100"
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="content"
            label="发言内容"
          />
          <el-table-column
            prop="priority"
            label="优先级"
          />
          <el-table-column
            prop="typeText"
            label="类型"
          />
          <el-table-column label="操作">
            <template slot-scope="item">
              <el-button
                type="text"
                size="small"
                @click="toEdit(item)"
              >
                编辑
              </el-button>
              <el-button
                type="text"
                size="small"
                @click="toDelete(item)"
              >
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
      currentPage: 1,
      totalCount: 0,
      list: [],
    };
  },
  created() {
    this.requestList();
  },
  methods: {
    requestList() {
      this.loading = !0;

      seeFetch('ling/face/list', {
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
    pageChange(page) {
      this.currentPage = page;
      this.requestList();
    },
    doSearch() {
      this.currentPage = 1;
      this.requestList();
    },
    toAdd() {
      addProps.forEach(({ name, default: defaultValue }) => {
        this.$store.state.lingFace.add[name] =
          typeof defaultValue === 'function' ? defaultValue() : defaultValue;
      });

      this.$store.state.lingFace.add.dialogTitle = '添加';
      this.$store.state.lingFace.add.isUpdate = !1;
      this.$store.state.lingFace.add.updateId = 0;
      this.$store.state.lingFace.add.visible = !0;
    },
    toEdit({ row: item }) {
      addProps.forEach(({ name }) => {
        this.$store.state.lingFace.add[name] = item[name];
      });

      this.$store.state.lingFace.add.dialogTitle = '编辑';
      this.$store.state.lingFace.add.visible = !0;
      this.$store.state.lingFace.add.isUpdate = !0;
      this.$store.state.lingFace.add.updateId = item.id;

      // fields
      this.$store.state.lingFace.add.type = item.type || 0;
      this.$store.state.lingFace.add.priority = item.priority || '';
      this.$store.state.lingFace.add.covers = [];

      const { cover } = this.$store.state.lingFace.add;

      if (cover) this.$store.state.lingFace.add.covers.push(cover);
    },
    toDelete({ row: item }) {
      this.$confirm('确定删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        seeFetch('ling/face/delete', { id: item.id }).then(res => {
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

          this.requestList();
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
