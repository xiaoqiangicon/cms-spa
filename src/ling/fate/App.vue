<template>
  <div class="container">
    <el-card>
      <div class="clearfix">
        <el-button class="fl-right" size="small" @click="toAdd">
          添加
        </el-button>
      </div>
      <div class="body">
        <el-table v-loading="loading" :data="list" style="width: 100%">
          <el-table-column prop="title" label="攻略标题" />
          <el-table-column prop="item" label="生效日期">
            <template slot-scope="item">
              {{ item.row.startDate }} ~ {{ item.row.endDate }}
            </template>
          </el-table-column>
          <el-table-column prop="priority" label="优先级" />
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
    <el-dialog :visible.sync="deleteDialogVisible" title="提示" width="30%">
      <span>确定删除吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">
          取 消
        </el-button>
        <el-button type="primary" @click="deleteItem">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <Add :ok="addDialogOk" />
  </div>
</template>

<script>
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';
import { addProps } from './data';
import Add from './Add';
import './fetch';

let idToDelete = 0;
let deleting = !1;

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
      deleteDialogVisible: !1,
    };
  },
  created() {
    this.requestList();
  },
  methods: {
    requestList() {
      this.loading = !0;

      seeFetch('ling/fate/list', {
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
    toAdd() {
      addProps.forEach(({ name, default: defaultValue }) => {
        this.$store.state.lingFate.add[name] =
          typeof defaultValue === 'function' ? defaultValue() : defaultValue;
      });

      this.$store.state.lingFate.add.dialogTitle = '添加';
      this.$store.state.lingFate.add.isUpdate = !1;
      this.$store.state.lingFate.add.updateId = 0;
      this.$store.state.lingFate.add.visible = !0;
    },
    toEdit({ row: item }) {
      addProps.forEach(({ name }) => {
        this.$store.state.lingFate.add[name] = item[name];
      });

      this.$store.state.lingFate.add.dialogTitle = '编辑';
      this.$store.state.lingFate.add.visible = !0;
      this.$store.state.lingFate.add.isUpdate = !0;
      this.$store.state.lingFate.add.updateId = item.id;
      this.$store.state.lingFate.add.priority = `${item.priority}`;
    },
    toDelete(item) {
      idToDelete = item.row.id;
      this.deleteDialogVisible = !0;
    },
    deleteItem() {
      if (deleting) return;

      deleting = !0;
      seeFetch('ling/fate/delete', { id: idToDelete }).then(res => {
        deleting = !1;

        if (!res.success) {
          Notification({
            title: '提示',
            message: res.message,
          });
          return;
        }

        this.deleteDialogVisible = !1;

        Notification({
          title: '提示',
          message: '删除成功',
        });

        this.requestList();
      });
    },
    addDialogOk() {
      this.currentPage = 1;
      this.requestList();
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
