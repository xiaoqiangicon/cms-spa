<template>
  <div class="container">
    <el-card>
      <div class="body">
        <el-table v-loading="loading" :data="list" style="width: 100%">
          <el-table-column prop="date" label="日期" />
          <el-table-column prop="item" label="兑换人">
            <template slot-scope="item">
              <img
                :src="item.row.avatar"
                class="wd-50 hg-50 bd-rd-50-pc mg-r-5"
              />
              {{ item.row.nickname }}
            </template>
          </el-table-column>
          <el-table-column prop="phone" label="手机号" />
          <el-table-column prop="item" label="奖品">
            <template slot-scope="item">
              {{ item.row.amount }}元{{ item.row.typeText }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="item">
              <span v-if="item.row.send">
                已发奖
              </span>
              <el-button v-else type="text" size="small" @click="toSend(item)">
                发奖
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
    <el-dialog :visible.sync="sendDialogVisible" title="提示" width="30%">
      <span>确定发奖吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="sendDialogVisible = false">
          取 消
        </el-button>
        <el-button type="primary" @click="sendItem">
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

let idToSend = 0;
let sending = !1;

export default {
  name: 'App',
  data() {
    return {
      loading: !0,
      currentPage: 1,
      totalCount: 0,
      list: [],
      sendDialogVisible: !1,
    };
  },
  created() {
    this.requestList();
  },
  methods: {
    requestList() {
      this.loading = !0;

      seeFetch('ling/send/list', {
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
    toSend(item) {
      idToSend = item.row.id;
      this.sendDialogVisible = !0;
    },
    sendItem() {
      if (sending) return;

      sending = !0;
      seeFetch('ling/send/send', { id: idToSend }).then(res => {
        sending = !1;

        if (!res.success) {
          Notification({
            title: '提示',
            message: res.message,
          });
          return;
        }

        this.sendDialogVisible = !1;

        Notification({
          title: '提示',
          message: '发奖成功',
        });

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
