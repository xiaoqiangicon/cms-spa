<template>
  <div class="contain">
    <el-card>
      <div>
        <el-date-picker
          v-model="filterStartDate"
          align="right"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="开始日期"
          size="small"
          style="width: 200px;"
          @change="doSearch"
        />
        <el-date-picker
          v-model="filterEndDate"
          align="right"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="结束日期"
          size="small"
          style="width: 200px;"
          @change="doSearch"
        />
        <el-input
          v-model="filterSearch"
          placeholder="订单号搜索"
          class="fl-right"
          size="small"
          style="width: 250px"
        >
          <el-button slot="append" icon="el-icon-search" @click="doSearch" />
        </el-input>
      </div>
      <div class="body">
        <el-table v-loading="loading" :data="list" style="width: 100%">
          <el-table-column prop="fromTypeText" label="来源" :align="'center'" />
          <el-table-column prop="name" label="佛事名称" :align="'center'" />
          <el-table-column
            prop="subdivideName"
            label="选择项名称"
            :align="'center'"
          />
          <el-table-column prop="orderNo" label="订单ID" :align="'center'" />
          <el-table-column
            prop="templeName"
            label="订单寺院"
            :align="'center'"
          />
          <el-table-column prop="area" label="分管大区" :align="'center'" />
          <el-table-column prop="price" label="金额" :align="'center'" />
          <el-table-column
            label="订单状态"
            prop="finishTypeText"
            :align="'center'"
          />
          <el-table-column
            prop="refundTime"
            label="用户申请退款时间"
            :align="'center'"
          />
          <el-table-column prop="payTime" label="支付时间" :align="'center'" />
          <el-table-column label="操作" :align="'center'">
            <template slot-scope="item">
              <div class="detail">
                <el-button size="small" @click="toDetail(item)">
                  订单详情
                </el-button>
                <el-button
                  size="small"
                  @click="showquashRefundOrderNDialog(item.row.orderNo)"
                  style="margin-left:0px"
                  v-if="!1"
                >
                  撤销退款
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-if="false"
          :current-page="page"
          background
          layout="prev, pager, next"
          style="margin-top: 40px"
          @current-change="pageChange"
        />
      </div>
    </el-card>
    <el-dialog
      :visible="detailDialog"
      title="订单详情"
      :before-close="hideDialog"
      width="600px"
    >
      <div class="row">订单类型：{{ rowData.orderTypeStr }}</div>
      <div class="row">订单ID：{{ rowData.orderNo }}</div>
      <div class="row">外部订单号：{{ rowData.wxTransactionId }}</div>
      <div class="row">寺院：{{ rowData.templeName }}</div>
      <hr />
      <div v-for="(item, key) in rowData.refundMessage" :key="key" class="row">
        <div class="row">
          {{ item.message }}
        </div>
        <div class="row">申请时间：{{ item.addTime }}</div>
      </div>
      <hr v-if="rowData.posiscript && rowData.posiscript.length" />
      <div
        v-for="(item, key) in rowData.posiscript"
        :key="key + 10000"
        class="row"
      >
        {{ item.name }}：{{ item.value }}
      </div>
      <hr v-if="rowData.pics && rowData.pics.length" />
      <div v-if="rowData.pics && rowData.pics.length" class="dispose-pic-list">
        <div class="row">
          反馈信息：
        </div>
        <el-image
          v-for="(item, key) in rowData.pics"
          :key="key + 20000"
          class="dispose-pic"
          :src="item"
          :preview-src-list="rowData.pics"
        />
      </div>
    </el-dialog>
    <el-dialog
      title="撤销订单"
      :visible.sync="quashRefundOrderNDialogTableVisible"
    >
      <el-input
        type="textarea"
        placeholder="取消退款说明"
        v-model="quashRefundContent"
        maxlength="300"
        show-word-limit
      >
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="quashRefundOrderNDialogTableVisible = false"
          >取 消</el-button
        >
        <el-button type="primary" @click="quashRefundOrder()"
          >确认撤销</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';
import { setTimeout } from 'timers';

export default {
  data() {
    return {
      filterStartDate: '',
      filterEndDate: '',
      filterSearch: '',
      loading: !0,
      page: 1,
      list: [],
      dialogVisible: !1,
      rowData: {},
      detailDialog: !1,
      quashRefundContent: '',
      quashRefundOrderNo: '',
      quashRefundOrderNDialogTableVisible: false,
    };
  },
  created() {
    this.fetchList();
  },
  methods: {
    fetchList() {
      this.loading = !0;

      seeFetch('order/refund/refundOrderList', {
        startDate: this.filterStartDate,
        endDate: this.filterEndDate,
        search: this.filterSearch,
        page: this.page,
        type: 2,
      }).then(res => {
        if (!res.success) {
          Notification({
            title: '提示',
            message: res.message,
          });
          return;
        }

        this.loading = !1;

        this.list = res.data;

        window.scrollTo(0, 0);
      });
    },
    quashRefundOrder() {
      seeFetch('order/quashRefundOrder', {
        message: this.quashRefundContent,
        orderNo: this.quashRefundOrderNo,
      }).then(res => {
        this.quashRefundOrderNDialogTableVisible = false;
        this.fetchList();
      });
    },
    pageChange(page) {
      this.page = page;
      this.fetchList();
    },
    doSearch() {
      this.page = 1;
      this.fetchList();
    },
    refund(rowData) {
      seeFetch('order/refund/refund', { orderId: rowData.orderNo }).then(
        res => {
          if (res.errorCode === 0) {
            this.dialogVisible = !1;
            window.location.reload();
          }
        }
      );
    },
    showRefund(item) {
      this.rowData = item.row;
      this.dialogVisible = !0;
    },
    toDetail(item) {
      this.rowData = item.row;
      console.log(this.rowData.pics);
      setTimeout(() => {
        this.detailDialog = !0;
      }, 100);
    },
    cancel() {
      this.dialogVisible = !1;
    },
    hideDialog(e) {
      if (e.currentTarget === e.target) {
        this.dialogVisible = !1;
        this.detailDialog = !1;
      }
    },
    showquashRefundOrderNDialog(orderNo) {
      this.quashRefundOrderNDialogTableVisible = true;
      this.quashRefundOrderNo = orderNo;
      this.quashRefundContent = '';
    },
  },
};
</script>

<style lang="less" scoped>
p {
  margin: 0;
}
.body {
  margin-top: 20px;
}
.row {
  margin-bottom: 4px;
  font-size: 16px;
}
.dialog {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 2000;
}
.dialog-content {
  position: absolute;
  left: 50%;
  top: 24vh;
  transform: translate(-50%, 0);
  width: 450px;
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: #fff;
  border-radius: 8px;
}
.dialog-title,
.dialog-tip,
.dialog-order,
.dialog-price {
  padding-left: 20px;
  font-size: 16px;
}
.dispose-pic-list {
  display: flex;
  flex-wrap: wrap;
  margin-top: 8px;
}
.dispose-pic {
  width: 100px;
  height: 100px;
  margin-right: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  &:nth-last-child(1) {
    margin-right: 0;
  }
}
.btn-box {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
