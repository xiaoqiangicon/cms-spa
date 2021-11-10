<template>
  <div class="container">
    <el-card>
      <div class="tips">
        <p class="tips-title">
          开票说明
        </p>
        <p class="tips-item">
          1、开票内容：信息技术服务费
        </p>
        <p class="tips-item">
          2、工作人员需在7个工作日内处理
        </p>
        <p class="tips-item">
          3、请查看备注信息，并与市场客服人员沟通
        </p>
        <p class="tips-item">
          4、申请过程中请注意保证信息的正确性，因为信息填写错误导致的发票开具、将不能重开
        </p>
        <p class="tips-item">
          5、开票金额由系统自动生成已经提现的订单且三个月内的订单金额
        </p>
      </div>
      <div class="status">
        <div
          :class="{ btn: true, 'btn-active': type === 1 }"
          @click="changeType(1)"
        >
          待处理
        </div>
        <div
          :class="{ btn: true, 'btn-active': type === 2 }"
          @click="changeType(2)"
        >
          已完成
        </div>
      </div>
      <div class="receipt-list">
        <div v-for="(item, key) in list" :key="key" class="receipt-item">
          <div class="receipt-item-header">
            <span>ID：{{ item.id }}</span>
            <span>申请时间：{{ item.addTime }}</span>
            <span>企业 - 增值税普通发票(电子)</span>
            <span>金额：{{ item.price }}元</span>
          </div>
          <div class="receipt-item-content">
            <div class="receipt-item-left">
              <div class="receipt-info">
                <div>
                  <span style="display: inline-block;margin-bottom: 6px;"
                    >发票抬头：{{ item.invoiceCompany }}</span
                  >
                  <span>纳税人识别号：{{ item.ratepayingNo }}</span>
                </div>
                <div>
                  <span style="display: inline-block;margin-bottom: 6px;"
                    >基本开户银行名称：{{ item.bankName }}</span
                  >
                  <span>基本开户账号：{{ item.bankNo }}</span>
                </div>
              </div>
              <p>注册场所地址：{{ item.registerAddress }}</p>
              <p style="margin-top: -10px;">
                注册固定电话：{{ item.registerMobile }}
              </p>
              <p style="margin-top: -10px;">备注：{{ item.note }}</p>
            </div>
            <div class="receipt-item-right">
              <el-upload
                :before-upload="upload(item)"
                :action="uploadImgApi"
                :file-list="fileList"
                :on-success="uploadSuccess"
              >
                <el-button
                  v-if="type === 1"
                  type="primary"
                  @click="upload(item)"
                >
                  上传Pdf
                </el-button>
              </el-upload>
              <el-button
                v-if="type === 1"
                type="danger"
                style="margin-top: 20px;"
                @click="cancel(item)"
              >
                取消
              </el-button>
              <el-button
                v-if="type === 2"
                style="margin-bottom: 20px;"
                @click="download(item)"
              >
                查看上传发票PDF
              </el-button>
              <el-upload
                :action="uploadImgApi"
                :file-list="fileList"
                :on-success="uploadSuccess"
              >
                <el-button
                  v-if="type === 2"
                  type="primary"
                  @click="upload(item)"
                >
                  修改上传文件
                </el-button>
              </el-upload>
            </div>
          </div>
        </div>
      </div>
      <el-pagination
        :current-page="pageNum"
        background
        layout="prev, pager, next"
        style="margin-top: 40px"
        :page-size="pageSize"
        :total="total"
        @current-change="pageChange"
      />
    </el-card>
  </div>
</template>

<script>
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';
import './fetch';

export default {
  name: 'App',
  data() {
    return {
      type: 1,
      list: [],
      pageNum: 1,
      pageSize: 25,
      total: 0,
      fileList: [],
      invoiceId: '',
    };
  },
  computed: {
    // 上传文件接口
    uploadImgApi() {
      return window.location.hostname.indexOf('localhost') === -1
        ? '/upload'
        : '/mock/upload.json';
    },
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      seeFetch('finance/receipt/list', {
        type: this.type,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      }).then(res => {
        if (!res.errorCode) {
          this.list = res.data.list;
          this.total = res.data.total;
        }
      });
    },
    changeType(type) {
      this.pageNum = 1;
      this.type = type;
      this.getList();
    },
    cancel(item) {
      this.$confirm('确定取消开发票吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          seeFetch('finance/receipt/cancelInvoice', {
            invoiceId: item.id,
          }).then(res => {
            if (!res.success) return;

            window.location.reload();
          });
        })
        .catch(() => {});
    },
    download(item) {
      window.open(item.pdfUrl);
    },
    upload(item) {
      this.invoiceId = item.id;
    },
    uploadSuccess(res) {
      console.log('success', res.data.pic);
      console.log(this.invoiceId);
      seeFetch('finance/receipt/upload', {
        invoiceId: this.invoiceId,
        pdfUrl: res.data.pic,
      }).then(res => {
        if (res.success) {
          window.location.reload();
        }
      });
    },
    pageChange(page) {
      this.pageNum = page;
      this.getList();
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
}
.status {
  display: flex;
}
.btn {
  padding: 6px 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
  cursor: pointer;
  &:nth-of-type(2) {
    margin-left: 20px;
  }
}
.btn-active {
  background-color: #409eff;
  border: 1px solid transparent;
  color: #fff;
}
.tips {
  padding: 10px 0 10px 20px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  .tips-title {
    font-size: 16px;
    font-weight: bold;
  }
  p {
    margin: 0;
    margin-bottom: 6px;
  }
}

.receipt-list {
  margin-top: 24px;
}
.receipt-item-header {
  height: 50px;
  padding-left: 20px;
  line-height: 50px;
  background-color: #409eff;
  color: #fff;
  span {
    margin-right: 8%;
  }
}
.receipt-item-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2% 6% 2% 4%;
  border: 1px solid #666;
  border-top: none;
  box-sizing: border-box;
}
.receipt-info {
  display: flex;
  span {
    display: block;
  }
  div:nth-of-type(2) {
    margin-left: 50px;
  }
}
</style>
