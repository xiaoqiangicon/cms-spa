<template>
  <div class="container">
    <el-card>
      <div>
        <span class="l-hg-32"> 状态 </span>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-select
          v-model="status"
          placeholder="请选择"
          size="small"
          style="width: 200px;"
          @change="statusChange"
        >
          <el-option value="-1" label="全部" />
          <el-option value="0" label="上架" />
          <el-option value="1" label="下架" />
        </el-select>
        <el-button class="fl-right" size="small" @click="toAdd">
          添加
        </el-button>
      </div>
      <div class="body">
        <el-table v-loading="loading" :data="list" style="width: 100%">
          <el-table-column prop="cover" label="礼品图片">
            <template slot-scope="item">
              <img :src="item.row.cover" style="width: 100px;" />
            </template>
          </el-table-column>
          <el-table-column prop="title" label="标题" />
          <el-table-column prop="exchangePrice" label="兑换价格" />
          <el-table-column prop="exchangeCount" label="兑换次数" />
          <el-table-column prop="priority" label="优先级" />
          <el-table-column prop="remainCount" label="库存" />
          <el-table-column prop="status" label="状态">
            <template slot-scope="item">
              <el-button
                v-if="item.row.status === 0"
                type="success"
                size="small"
                @click="changeItemStatus(item)"
              >
                上架
              </el-button>
              <el-button
                v-else
                type="warning"
                size="small"
                @click="changeItemStatus(item)"
              >
                下架
              </el-button>
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
  </div>
</template>

<script>
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';
import './fetch';

let idToDelete = 0;
let deleting = !1;

export default {
  name: 'App',
  data() {
    return {
      status: '',
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

      const status = parseInt(this.status, 10);

      seeFetch('ling/index/list', {
        status: Number.isNaN(status) ? -1 : status,
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
    statusChange() {
      this.currentPage = 1;
      this.requestList();
    },
    toAdd() {
      window.sessionStorage.removeItem('ling/edit/item');

      this.$router.push('/ling/edit/0');
    },
    toEdit(item) {
      window.sessionStorage['ling/edit/item'] = JSON.stringify(item.row);

      this.$router.push(`/ling/edit/${item.row.id}`);
    },
    toDelete(item) {
      idToDelete = item.row.id;
      this.deleteDialogVisible = !0;
    },
    deleteItem() {
      if (deleting) return;

      deleting = !0;
      seeFetch('ling/index/delete', { id: idToDelete }).then(res => {
        if (!res.success) {
          Notification({
            title: '提示',
            message: res.message,
          });
          return;
        }

        this.deleteDialogVisible = !1;
        deleting = !1;

        this.requestList();
      });
    },
    changeItemStatus({ row: item }) {
      seeFetch('ling/index/status', {
        id: item.id,
        status: item.status === 0 ? 1 : 0,
      }).then(res => {
        if (!res.success) {
          Notification({
            title: '提示',
            message: res.message,
          });
          return;
        }

        this.requestList();
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
