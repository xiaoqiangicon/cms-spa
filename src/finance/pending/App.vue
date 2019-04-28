<template>
  <div class="container">
    <el-card>
      <div class="filter clearfix">
        <span class="l-hg-32 dp-inline-block wd-100"> 状态： </span>
        <span
          :class="filterStatus === 1 ? 'active-btn' : ''"
          @click="filterStatusChange(1)"
        >
          <el-button type="text"
            >申请提现<el-badge
              v-if="toHandleCount"
              class="mark"
              :value="toHandleCount"
          /></el-button> </span
        >&nbsp;&nbsp;&nbsp;&nbsp;
        <span
          :class="filterStatus === 2 ? 'active-btn' : ''"
          @click="filterStatusChange(2)"
        >
          <el-button type="text"
            >有疑问<el-badge
              v-if="toReplyCount"
              class="mark"
              :value="toReplyCount"
          /></el-button> </span
        >&nbsp;&nbsp;&nbsp;&nbsp;
        <span
          :class="filterStatus === 4 ? 'active-btn' : ''"
          @click="filterStatusChange(4)"
        >
          <el-button type="text">待上传收据</el-button> </span
        >&nbsp;&nbsp;&nbsp;&nbsp;
        <span
          :class="filterStatus === 5 ? 'active-btn' : ''"
          @click="filterStatusChange(5)"
        >
          <el-button type="text">已上传收据</el-button> </span
        >&nbsp;&nbsp;&nbsp;&nbsp;
        <span
          :class="filterStatus === 6 ? 'active-btn' : ''"
          @click="filterStatusChange(6)"
        >
          <el-button type="text">已拒绝收据</el-button> </span
        >&nbsp;&nbsp;&nbsp;&nbsp;
        <span
          :class="filterStatus === 3 ? 'active-btn' : ''"
          @click="filterStatusChange(3)"
        >
          <el-button type="text">提现完成</el-button> </span
        >&nbsp;&nbsp;&nbsp;&nbsp;
      </div>
      <div class="filter clearfix">
        <span class="l-hg-32 dp-inline-block wd-100"> 邮寄收据：</span>
        <span
          :class="filterReceipt === -1 ? 'active-btn' : ''"
          @click="filterReceiptChange(-1)"
        >
          <el-button type="text">全部</el-button> </span
        >&nbsp;&nbsp;&nbsp;&nbsp;
        <span
          :class="filterReceipt === 0 ? 'active-btn' : ''"
          @click="filterReceiptChange(0)"
        >
          <el-button type="text">未邮寄收据</el-button> </span
        >&nbsp;&nbsp;&nbsp;&nbsp;
        <span
          :class="filterReceipt === 1 ? 'active-btn' : ''"
          @click="filterReceiptChange(1)"
        >
          <el-button type="text">已邮寄收据</el-button> </span
        >&nbsp;&nbsp;&nbsp;&nbsp;
      </div>
      <div class="clearfix">
        <span class="l-hg-32 dp-inline-block wd-100"> 寺院过滤： </span>
        <el-select
          v-model="filterTemple"
          filterable
          placeholder="请选择"
          size="small"
          @change="filterTempleChange"
        >
          <el-option label="汇总" :value="0" />
          <el-option
            v-for="item in temples"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </div>
      <div class="body">
        <el-table v-loading="loading" :data="list" style="width: 100%">
          <el-table-column prop="time" label="申请时间" />
          <el-table-column prop="templeName" label="申请寺院" />
          <el-table-column prop="statusText" label="类型" />
          <el-table-column prop="amount" label="金额" />
          <el-table-column label="邮寄收据">
            <template slot-scope="item">
              <el-switch
                :value="!!item.row.gotReceipt"
                active-text="是"
                inactive-text="否"
                @change="value => changeGotReceipt(value, item)"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="item">
              <el-button
                v-if="item.row.showFeedbackImages"
                type="text"
                @click="toShowFeedbackImages(item)"
              >
                回单照片
              </el-button>
              <el-button
                v-if="item.row.showReceiptImages"
                type="text"
                @click="toShowReceiptImages(item)"
              >
                收据照片
              </el-button>
              <el-button
                v-if="item.row.isQuestion === 0 && item.row.type === 5"
                type="text"
                @click="toConfirmGetReceipt(item)"
              >
                确认收据
              </el-button>
              <el-button type="text" @click="toDetail(item)">
                查看
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
    <Add :ok="addDialogOk" />
  </div>
</template>

<script>
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';
import $ from 'jquery';
import '@fancyapps/fancybox/dist/jquery.fancybox.css';
import '@fancyapps/fancybox';
import fancyboxConfig from '../../configs/fancybox';
import Add from './Add';
import './fetch';

export default {
  name: 'App',
  components: { Add },
  data() {
    return {
      filterStatus: 1,
      filterReceipt: -1,
      filterTemple: 0,
      loading: !0,
      currentPage: 1,
      totalCount: 0,
      list: [],
      temples: [],
      toHandleCount: 0,
      toReplyCount: 0,
    };
  },
  created() {
    seeFetch('finance/pending/temples').then(res => {
      if (!res.success || !res.data || !res.data.length) {
        Notification({
          title: '提示',
          message: '获取寺院数据失败',
        });
        return;
      }

      this.temples = res.data;
    });

    this.fetchStat();
    this.fetchList();
  },
  methods: {
    fetchStat() {
      seeFetch('finance/pending/stat').then(res => {
        this.toHandleCount = res.toHandleCount || 0;
        this.toReplyCount = res.toReplyCount || 0;
      });
    },
    fetchList() {
      this.loading = !0;
      seeFetch('finance/pending/list', {
        status: this.filterStatus,
        templeId: this.filterTemple,
        gotReceipt: this.filterReceipt,
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
    toSearch() {
      this.currentPage = 1;
      this.fetchList();
    },
    filterStatusChange(value) {
      if (this.filterStatus === value) return;

      this.filterStatus = value;
      this.toSearch();
    },
    filterReceiptChange(value) {
      if (this.filterReceipt === value) return;

      this.filterReceipt = value;
      this.toSearch();
    },
    filterTempleChange(value) {
      if (this.filterTemple === value) return;

      this.filterTemple = value;
      this.toSearch();
    },
    changeGotReceipt(value, { row: item }) {
      seeFetch('finance/pending/updateGotReceipt', {
        id: item.id,
        gotReceipt: value ? 1 : 0,
      }).then(res => {
        if (!res.success) {
          Notification({
            title: '提示',
            message: res.message || '操作失败',
          });
          return;
        }

        // eslint-disable-next-line no-param-reassign
        item.gotReceipt = value ? 1 : 0;

        Notification({
          title: '提示',
          message: '修改成功',
        });
      });
    },
    toShowFeedbackImages({ row: item }) {
      $.fancybox.open(
        item.feedbackImages.map(src => ({ src })),
        fancyboxConfig
      );
    },
    toShowReceiptImages({ row: item }) {
      $.fancybox.open(item.receiptImages.map(src => ({ src })), fancyboxConfig);
    },
    toConfirmGetReceipt({ row: item }) {
      this.$store.state.financePending.add.visible = !0;
      this.$store.state.financePending.add.isUpdate = !0;
      this.$store.state.financePending.add.updateId = item.id;
      this.$store.state.financePending.add.receiptImages = item.receiptImages;
    },
    toDetail({ row: item }) {
      window.sessionStorage['finance/taking||item'] = JSON.stringify(item);

      this.$router.push(`/finance/taking/${item.id}`);
    },
    addDialogOk() {
      this.fetchStat();
      this.fetchList();
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  padding: 40px 20px;
}

.body {
  margin-top: 20px;
}

.filter {
  .el-button {
    color: #333;
  }

  .active-btn {
    .el-button {
      color: #409eff;
    }
  }
}
</style>
