<template>
  <div class="contain" v-if="showDetail">
    <el-dialog
      title="提现账单详情"
      width="80%"
      :visible="showDialog"
      :before-close="close"
    >
      <div class="bill-download" @click="download">导出订单明细</div>
      <el-table class="table" :data="detailData.list" style="width: 100%">
        <el-table-column
          prop="calculationTime"
          label="时间"
          :align="'center'"
        />
        <el-table-column prop="price" label="金额（元）" :align="'center'" />
      </el-table>
      <div class="cal-box">
        <div class="cal-header">账单计算</div>
        <div class="cal-content">
          <p class="cal-money">以上账单累计金额：{{ total }}元</p>
          <div class="minus-money">
            <div class="minus-sign">减去</div>
            <p class="tax">代缴税费（6%税率）{{ tax }}元</p>
          </div>
        </div>
        <div class="cal-footer">
          <div class="total-sign">总计</div>
          <p class="total-money">提现金额：{{ pickUpMoney }}元</p>
        </div>
      </div>
      <div class="wrapper">
        <div class="info-box">
          <div class="info-title">账户信息</div>
          <div class="inifo-content">
            <div class="info-row">
              <span>真实姓名：</span>
              <span>{{ detailData.user.name }}</span>
            </div>
            <div class="info-row">
              <span>身份证号码：</span>
              <span>{{ detailData.user.idCard }}</span>
            </div>
            <div class="info-row">
              <span>银行账号：</span>
              <span>{{ detailData.user.bankCard }}</span>
            </div>
            <div class="info-row">
              <span>开户银行：</span>
              <span>{{ detailData.user.bank }}</span>
            </div>
            <div class="info-row">
              <span>开户所在支行名称：</span>
              <span>{{ detailData.user.underBank }}</span>
            </div>
            <div class="info-card">
              <span>身份证</span>
              <div class="card-img">
                <img
                  class="card-img-item"
                  :src="detailData.user.cardImgFront"
                  alt=""
                />
                <img
                  class="card-img-item"
                  :src="detailData.user.cardImgBack"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div
          class="btn-box"
          v-if="
            detailData.status === 1 ||
              detailData.status === 2 ||
              detailData.status === 0
          "
        >
          <el-button
            type="primary"
            @click="confirm"
            v-if="detailData.status === 1 || detailData.status === 2"
            >确认账单</el-button
          >
          <el-button
            type="warning"
            @click="reject"
            v-if="!1 && (detailData.status === 1 || detailData.status === 2)"
            >打回</el-button
          >
          <el-button
            type="primary"
            @click="confirm"
            v-if="detailData.status === 0"
            >更新回单照片</el-button
          >
        </div>
      </div>
      <div class="recall">
        <div class="recall-box" v-if="detailData.feedbackPic">
          <div class="recall-title">银行回单</div>
          <img
            class="feedback-img"
            v-for="(item, key) in detailData.feedbackPic.split(',')"
            :key="key"
            :src="item"
            alt=""
          />
        </div>
        <div class="reject" v-if="detailData.status === 3">
          <div class="recall-title">拒绝原因</div>
          <div class="reject-reason">{{ detailData.content }}</div>
        </div>
      </div>
      <el-dialog
        title="上传银行回单照片"
        append-to-body
        :visible="showUpload"
        :before-close="closeUpload"
      >
        <Upload :images="handleImages" :multiple="!0" />
        <el-button @click="save" class="save" type="primary">保存</el-button>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import { Notification } from 'element-ui';
import seeFetch from 'see-fetch';
import Upload from '../../com/upload/Upload';

export default {
  name: 'Detail',
  props: {
    showDetail: {
      isRequired: !0,
      type: Boolean,
    },
    detailData: {
      isRequired: !0,
      type: Object,
    },
    pickUpId: {
      isRequired: !0,
      type: Number,
    },
  },
  data() {
    return {
      showDialog: !0,
      showUpload: !1,
      handleImages: [],
    };
  },
  components: {
    Upload,
  },
  computed: {
    total() {
      let sum = 0;
      this.detailData.list.forEach(item => {
        sum += item.price;
      });
      return sum;
    },
    tax() {
      return (this.total * 0.06).toFixed(2);
    },
    pickUpMoney() {
      return this.total - this.tax;
    },
  },
  methods: {
    download() {
      window.open(`/video/getPickUpMessageExcel?pickUpId=${this.pickUpId}`);
    },
    confirm() {
      if (this.detailData.feedbackPic.length) {
        this.handleImages = this.detailData.feedbackPic.split(',');
      }
      this.showUpload = !0;
    },
    reject() {
      this.$prompt('请填写提现打回原因', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        if (!value) {
          Notification({
            title: '提示',
            message: '必须输入打回原因哦',
          });
          return;
        }
        seeFetch('fund/pending/updatePickUp', {
          pickUpId: this.pickUpId,
          status: 3,
          content: value,
        }).then(res => {
          if (res.errorCode === 0) {
            Notification({
              title: '提示',
              message: '打回成功',
            });
            window.location.reload();
          }
        });
      });
    },
    save() {
      if (!this.handleImages.length) {
        Notification({
          title: '提示',
          message: '请上传银行回单',
        });
        return;
      }
      seeFetch('fund/pending/updatePickUp', {
        pickUpId: this.pickUpId,
        status: 0,
        feedbackPic: this.handleImages.join(','),
      }).then(res => {
        if (res.errorCode === 0) {
          window.location.reload();
        } else {
          Notification({
            title: '提示',
            message: '保存失败',
          });
          return;
        }
      });
    },
    close() {
      this.$emit('closeDialog', !1);
    },
    closeUpload() {
      this.showUpload = !1;
    },
  },
};
</script>

<style lang="less" scoped>
.bill-download {
  float: right;
  height: 34px;
  margin-bottom: 14px;
  margin-right: 20px;
  border: 1px solid #039aff;
  line-height: 34px;
  width: 120px;
  text-align: center;
  border-radius: 17px;
  color: #039aff;
  cursor: pointer;
}
.bill-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  line-height: 60px;
  padding: 0 20px;
  margin: 0 auto 10px;
  background-color: #fff;
  font-size: 16px;
  color: #333;
  font-weight: bold;
}
.table {
  margin-bottom: 10px;
}
.feedback-img {
  width: 200px;
  height: 100px;
  margin-bottom: 10px;
}
.cal-box {
  padding: 10px 20px;
  background-color: #fff;
  color: #333;
}
.cal-header {
  padding-bottom: 6px;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  border-bottom: 1px solid #eee;
}
.cal-money {
  margin: 10px 0;
  line-height: 40px;
  font-size: 16px;
}
.minus-money {
  display: flex;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 1px solid #eee;
}
.minus-sign {
  width: 50px;
  height: 22px;
  margin-right: 20px;
  border-radius: 12px;
  border: 1px solid #f8b320;
  text-align: center;
  line-height: 20px;
  background-color: #fdecc7;
  font-size: 14px;
  color: #f8b320;
}
.cal-footer {
  display: flex;
  align-items: center;
  padding: 18px 0 6px;
}
.total-sign {
  width: 50px;
  height: 22px;
  margin-right: 20px;
  border-radius: 12px;
  border: 1px solid #039aff;
  text-align: center;
  line-height: 20px;
  background-color: #e3eeff;
  font-size: 14px;
  color: #039aff;
}
.total-money {
  font-size: 16px;
  font-weight: bold;
}
.wrapper {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.btn-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38%;
  background-color: #fff;
}
.info-box,
.recall {
  padding: 10px 20px;
  margin-top: 10px;
  background-color: #fff;
  color: #333;
}
.info-box {
  width: 60%;
  margin-top: 0;
}
.info-title,
.recall-title {
  padding-bottom: 6px;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  border-bottom: 1px solid #eee;
}
.info-row {
  margin-bottom: 4px;
  font-size: 16px;
  line-height: 26px;
}
.recall {
  padding-bottom: 20px;
  font-size: 16px;
}
.info-card {
  font-size: 16px;
}
.card-img {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.card-img-item {
  width: 45%;
}

.save {
  display: block;
  margin: 40px auto 0;
}
</style>
