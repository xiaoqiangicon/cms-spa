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
        <span style="margin-left: 20px;">选择区域：</span>
        <el-select
          v-model="area"
          size="small"
          placeholder="请选择区域"
          filterable
          @change="doSearch"
        >
          <el-option :key="0" label="全部" :value="0" />
          <el-option
            v-for="item in areaList"
            :key="item.name"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
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
          <el-table-column prop="area" label="订单分管大区" :align="'center'" />
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
          <el-table-column label="退款理由" :align="'center'">
            <template slot-scope="scope">
              <div>
                {{
                  scope.row.refundMessage[scope.row.refundMessage.length - 1]
                    .message
                }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="refundTime"
            label="用户申请退款(时间)"
            :align="'center'"
          />
          <el-table-column prop="payTime" label="支付时间" :align="'center'" />
          <el-table-column label="操作" :align="'center'">
            <template slot-scope="item">
              <div class="detail">
                <el-button size="small" @click="toDetail(item)">
                  订单详情
                </el-button>
              </div>
              <div>
                <el-button size="small" type="danger" @click="showRefund(item)">
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
    <div v-show="dialogVisible" class="dialog" @click="hideDialog">
      <div class="dialog-content">
        <p class="dialog-title">
          <span>订单类型：</span>{{ rowData.orderTypeStr }}
        </p>
        <div class="dialog-row">
          <span>退款说明：</span>
          <el-input
            style="width: 70%"
            type="textarea"
            :rows="5"
            v-model="content"
          />
        </div>
        <div class="dialog-row">
          <span>上传图片：</span>
          <Upload :images="uploadImages" :multiple="!0" />
        </div>
        <div class="btn-box">
          <el-button size="small" @click="cancel">
            取消
          </el-button>
          <el-button size="small" type="primary" @click="refund(rowData)">
            同意退款
          </el-button>
        </div>
      </div>
    </div>
    <el-dialog
      :visible="detailDialog"
      title="订单详情"
      :before-close="hideDialog"
      width="600px"
    >
      <div class="row">用户昵称：{{ rowData.nickName }}</div>
      <div class="row">用户手机号码：{{ rowData.mobile }}</div>
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
  </div>
</template>

<script>
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';
import { setTimeout } from 'timers';
import Upload from '../../../com/upload/Upload';

export default {
  data() {
    return {
      refunding: !1,
      filterStartDate: '',
      filterEndDate: '',
      filterSearch: '',
      loading: !0,
      page: 1,
      list: [],
      dialogVisible: !1,
      rowData: {},
      detailDialog: !1,
      content: '',
      uploadImages: [],
      area: '',
      areaList: [
        { name: '华东一' },
        { name: '华东二' },
        { name: '华东三' },
        { name: '华南' },
        { name: '华北' },
        { name: '华中' },
        { name: '东北' },
        { name: '西南' },
        { name: '西北' },
      ],
    };
  },
  components: {
    Upload,
  },
  created() {
    this.fetchList();
  },
  watch: {
    dialogVisible: function(newVal) {
      if (!newVal) {
        this.content = '';
        this.handleImages = [];
      }
    },
  },
  methods: {
    fetchList() {
      this.loading = !0;

      seeFetch('order/refund/refundOrderList', {
        startDate: this.filterStartDate,
        endDate: this.filterEndDate,
        search: this.filterSearch,
        page: this.page,
        type: 1,
        area: this.area || '',
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
    refund(rowData) {
      if (this.refunding) return;
      if (!this.content) {
        Notification({
          title: '提示',
          message: '请填写退款说明',
        });
        return;
      }
      if (!this.uploadImages.length) {
        Notification({
          title: '提示',
          message: '请至少上传一张图片',
        });
        return;
      }
      this.refunding = !0;
      seeFetch('order/refund/refund', {
        orderId: rowData.orderNo,
        content: this.content,
        imgs: this.uploadImages.join(','),
      }).then(res => {
        if (res.errorCode === 0) {
          this.refunding = !1;
          this.dialogVisible = !1;
          window.location.reload();
        }
      });
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
  z-index: 2000;
}
.dialog-content {
  position: absolute;
  left: 50%;
  top: 24vh;
  transform: translate(-50%, 0);
  width: 600px;
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
.dialog-title span {
  margin-right: 14px;
}
.dialog-row {
  display: flex;
  align-items: center;
  margin-top: 20px;
  span {
    padding-left: 20px;
    margin-right: 14px;
    font-size: 16px;
  }
}
.btn-box {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
