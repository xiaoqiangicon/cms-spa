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
          <el-table-column prop="name" label="名称" :align="'center'" />
          <el-table-column
            prop="templeName"
            label="订单寺院"
            :align="'center'"
          />
          <el-table-column prop="price" label="金额" :align="'center'" />
          <el-table-column
            label="订单状态"
            prop="finishTypeText"
            :align="'center'"
          />
          <el-table-column prop="payTime" label="下单时间" :align="'center'" />
          <el-table-column
            prop="refundTime"
            label="申请时间"
            :align="'center'"
          />
          <el-table-column label="操作" :align="'center'">
            <template slot-scope="item">
              <div class="detail">
                <el-button size="small" @click="toDetail(item)">
                  订单详情
                </el-button>
              </div>
              <div>
                <el-button size="small" type="danger" @click="toRefund(item)">
                  同意退款
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
    <div v-show="dialogVisible" class="dialog" @click="maskHideDialog">
      <div class="dialog-content">
        <p class="dialog-title">
          客服已确认
        </p>
        <p class="dialog-tip">
          您确定将此订单设为"退款状态"吗？
        </p>
        <p class="dialog-order">订单ID：{{ rowData.orderNo }}</p>
        <p class="dialog-price">金额：{{ rowData.price }}元</p>
        <div class="btn-box">
          <el-button size="small" @click="hideDialog">
            取消
          </el-button>
          <el-button size="small" type="primary" @click="refund">
            确认
          </el-button>
        </div>
      </div>
    </div>
    <el-dialog
      :visible="detailVisible"
      title="订单详情"
      :before-close="clickCancel"
      width="500px"
    >
      <div class="row">佛事名称: {{ rowData.name }}</div>
      <div class="row">订单寺院: {{ rowData.templeName }}</div>
      <div class="row">订单类型：{{ rowData.orderTypeStr }}</div>
      <div class="row">订单ID：{{ rowData.orderNo }}</div>
      <div class="row">外部订单号：{{ rowData.wxTransactionId }}</div>
      <div class="row">退款金额：{{ rowData.price }}</div>
      <div class="row">下单时间：{{ rowData.payTime }}</div>
      <hr />
      <div v-for="(item, key) in rowData.refundMessage" :key="key" class="row">
        <div style="margin-bottom: 4px;">
          {{ item.message }}
        </div>
        <div>{{ item.addTime }}</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import './fetch';
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';

export default {
  data() {
    return {
      filterStartDate: '',
      filterEndDate: '',
      filterSearch: '',
      loading: !0,
      page: 1,
      total: 0,
      list: [],
      dialogVisible: !1,
      detailVisible: !1,
      rowData: { orderNo: 1, price: 1 }, // 选中的rowData
    };
  },
  created() {
    this.fetchList();
  },
  methods: {
    fetchList() {
      this.loading = !0;

      seeFetch('finance/refund/refundOrderList', {
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
    pageChange(page) {
      this.page = page;
      this.fetchList();
    },
    doSearch() {
      this.page = 1;
      this.fetchList();
    },
    toRefund(rowData) {
      this.dialogVisible = !0;
      this.rowData = rowData.row;
    },
    toDetail(rowData) {
      this.detailVisible = !0;
      this.rowData = rowData.row;
    },
    refund() {
      seeFetch('finance/refund/refund', { orderId: this.rowData.orderNo }).then(
        res => {
          if (res.errorCode === 0) {
            this.dialogVisible = !1;
            window.location.reload();
          }
        }
      );
    },
    hideDialog(e) {
      this.dialogVisible = !1;
    },
    maskHideDialog(e) {
      if (e.target === e.currentTarget) this.dialogVisible = !1;
    },
    clickCancel() {
      this.detailVisible = !1;
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
  font-size: 16px;
  margin-bottom: 8px;
}
.detail {
  margin-bottom: 10px;
}
.dialog {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 3000;
}
.dialog-content {
  position: absolute;
  left: 50%;
  top: 24vh;
  transform: translate(-50%, 0);
  width: 450px;
  height: 200px;
  padding-top: 20px;
  background-color: #fff;
  border-radius: 8px;
  font-size: 16px;
}
.dialog-title,
.dialog-tip,
.dialog-order,
.dialog-price {
  text-align: center;
}
.dialog-title {
  margin-bottom: 10px;
  font-size: 18px;
}
.dialog-order {
  margin: 6px 0;
}
.btn-box {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
