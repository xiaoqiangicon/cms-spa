<template>
  <div class="container">
    <el-card v-loading="loading">
      <el-card v-if="isQuestion" class="box-card">
        <el-button
          v-if="type === 1"
          size="small"
          class="fl-right"
          plain
          @click="toAnswer"
        >
          回复
        </el-button>
        <div>{{ templeName }}有疑问：{{ question }}</div>
        <div v-if="type === 2" class="mg-t-20">已回复：{{ answer }}</div>
      </el-card>
      <div class="clearfix mg-t-20">
        <el-button
          size="small"
          class="fl-right"
          plain
          :type="showType === 1 ? 'primary' : 'default'"
          @click="changeShowType(1)"
        >
          每月详情
        </el-button>
        <el-button
          size="small"
          class="fl-right mg-r-10"
          plain
          :type="showType === 2 ? 'primary' : 'default'"
          @click="changeShowType(2)"
        >
          项目汇总
        </el-button>
      </div>
      <div class="content mg-t-20">
        <div
          v-for="(dateItem, index) in dateItems"
          v-if="showType === 1 || showType === 3"
          :key="index"
          class="unit-container"
        >
          <div class="head">
            <div class="unit unit-head">
              <div class="unit-inner">
                <div v-if="showType === 1" class="cell cell-name">
                  {{ dateItem.year }}年{{ dateItem.month }}月项目
                </div>
                <div v-else class="cell cell-name">
                  项目名称
                </div>
                <div class="cell">
                  数量
                </div>
                <div class="cell">
                  金额
                </div>
                <div class="cell" v-if="!1">
                  增值服务费
                </div>
                <div class="cell" v-if="!1">
                  支付渠道手续费
                </div>
              </div>
            </div>
          </div>
          <div class="body">
            <div
              v-for="(order, index2) in dateItem.orders"
              :key="index2"
              class="unit"
            >
              <div class="unit-inner">
                <div class="cell cell-name">
                  <span
                    v-if="order.isPromotionFoShi"
                    class="badge badge-blue pd-l-20 pd-r-20 mg-r-20 cs-pointer"
                    @click="seeRateList(index, index2, index2)"
                    >推广佛事</span
                  >
                  {{ order.title }}
                </div>
                <div class="cell">
                  {{ order.count }}
                </div>
                <div class="cell">¥{{ order.amount }}</div>
                <div class="cell" v-if="!1">
                  {{
                    order.increaseCharge
                      ? '-¥' + order.increaseCharge
                      : '无服务费'
                  }}
                </div>
                <div class="cell" v-if="!1">-¥{{ order.channelCharge }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showType !== 1" class="unit-container">
        <el-table
          row-key="id"
          :data="dateItems[0].orders"
          style="width: 100%;font-size: 12px;"
        >
          <el-table-column label="项目名称" width="450">
            <template slot-scope="scope">
              <span
                v-if="scope.row.isPromotionFoShi"
                class="badge badge-blue pd-l-20 pd-r-20 mg-r-20 cs-pointer"
                @click="seeRateList(0, scope.row.id - 1, scope.row.id)"
                >推广佛事</span
              >
              {{ scope.row.title }}
            </template>
          </el-table-column>
          <el-table-column prop="income_time" label="时间" :align="'center'" />
          <el-table-column prop="count" label="数量" :align="'center'" />
          <el-table-column prop="amount" label="金额" :align="'center'" />
          <el-table-column label="增值服务费" :align="'center'">
            <template slot-scope="scope">
              {{
                scope.row.increaseCharge
                  ? '-¥' + scope.row.increaseCharge
                  : '无服务费'
              }}
            </template>
          </el-table-column>
          <el-table-column prop="name" label="支付渠道手续费" :align="'center'">
            <template slot-scope="scope">
              -¥{{ scope.row.channelCharge }}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-card class="mg-t-20" v-if="showType !== 1">
        <div slot="header" class="clearfix">
          <span>提现计算</span>
        </div>
        <div>以上已勾选账单金额：{{ totalAmount }}元</div>
        <div v-if="totalIncreaseCharge" class="mg-t-10">
          <span class="badge badge-yellow pd-l-20 pd-r-20 mg-r-20">减去</span>
          增值服务费：{{ totalIncreaseCharge }} 元
        </div>
        <div v-if="totalFunctionCharge" class="mg-t-10">
          <span class="badge badge-yellow pd-l-20 pd-r-20 mg-r-20">减去</span>
          功能服务费：{{ totalFunctionCharge }} 元
          <el-tooltip
            content="若使用分享推广功能自在家系统将收取2%的服务费"
            placement="top"
          >
            <i class="el-icon-question question" />
          </el-tooltip>
        </div>
        <div v-if="totalPromoterReward" class="mg-t-10">
          <span class="badge badge-yellow pd-l-20 pd-r-20 mg-r-20">减去</span>
          推广员奖励金：{{ totalPromoterReward }} 元
          <el-tooltip content="奖励金是结算给推广员的金额" placement="top">
            <i class="el-icon-question question" />
          </el-tooltip>
        </div>
        <div v-if="totalChannelCharge" class="mg-t-10">
          <span class="badge badge-yellow pd-l-20 pd-r-20 mg-r-20">减去</span>
          支付渠道手续费：{{ totalChannelCharge }} 元
          <el-tooltip
            content="支付渠道手续费是支付宝或微信收取，自在家只是负责代扣。"
            placement="top"
          >
            <i class="el-icon-question question" />
          </el-tooltip>
        </div>
        <div v-if="totalChannelSubsidy" class="mg-t-10">
          <span class="badge badge-green pd-l-20 pd-r-20 mg-r-20">增加</span>
          补贴支付渠道手续费：{{ totalChannelSubsidy }} 元
        </div>
        <div v-if="platformSupport" class="mg-t-10">
          <span class="badge badge-yellow pd-l-20 pd-r-20 mg-r-20">减去</span>
          打赏自在家的金额：{{ platformSupport }} 元
        </div>
        <div v-if="specialCharge" class="mg-t-10">
          <span class="badge badge-yellow pd-l-20 pd-r-20 mg-r-20">减去</span>
          特殊提现超限服务费：{{ specialCharge }} 元
          <el-tooltip
            content="寺院每年可特殊提现两次，因特殊提现需要额外计算与校验，超出次数后将收取6%人工处理费。"
            placement="top"
          >
            <i class="el-icon-question question" />
          </el-tooltip>
        </div>
        <el-divider />
        <div>
          <span class="badge badge-blue pd-l-20 pd-r-20 mg-r-20">总计</span>
          提现金额：{{ realTakeAmount }} 元
          <div class="fl-right mg-b-20 mg-r-20">
            订单状态：{{ typeText }}<br />
            提现申请：{{ createTime }}<br />
            提现完成：{{ updateTime }}<br />
          </div>
        </div>
      </el-card>
      <el-card
        v-if="remarks && remarks.length && showType !== 1"
        class="mg-t-20"
      >
        <div slot="header" class="tips-header">
          <div class="header-left">
            <span>提现注意事项</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span class="gray">若下列注意事项已经完成，请勾选为已处理</span>
          </div>
          <div class="header-right">
            <el-button class="primary" @click="addBill">
              添加记账
            </el-button>
            <el-button @click="showBillList">
              记账列表
            </el-button>
          </div>
        </div>
        <div
          v-for="remark in remarks"
          :key="remark.id"
          class="remark-row"
          :class="remark.takeEffect ? '' : 'disabled'"
        >
          <button class="clean remark-btn" @click="updateRemark(remark)" />
          <span>{{ remark.content }}</span>
        </div>
      </el-card>
      <el-card class="mg-t-20" v-if="showType !== 1">
        <div slot="header" class="clearfix">
          <span>{{ templeName }}账户信息</span>
        </div>
        <div v-if="isQuestion === 0" class="fl-right t-a-right">
          <div v-if="type !== 2" class="red">
            {{
              type === 5
                ? '*确认打款后后不可撤销，请仔细核对'
                : '*确认订单后不可撤销，请仔细核对'
            }}
          </div>
          <div class="mg-t-20">
            <el-button
              v-if="type !== 2 && type !== 5"
              size="small"
              @click="confirmTake"
            >
              确认提现订单
            </el-button>
            <el-button
              v-if="type === 2 || type === 5"
              size="small"
              @click="confirmReceive"
            >
              {{ type === 5 ? '确认已打款' : '更新处理' }}
            </el-button>
            <el-button
              v-if="type === 2 || type === 5"
              size="small"
              @click="uploadFeedbackImages"
            >
              {{ type === 5 ? '上传回单图片' : '更新回单照片' }}
            </el-button>
          </div>
        </div>
        <div class="pic-list">
          <div v-if="placeNoPic" class="pic-item">
            <el-image
              style="width: 100px; height: 100px"
              :src="placeNoPic"
              :preview-src-list="[placeNoPic]"
            />
            <span>宗教场所</span>
          </div>
          <div v-if="certificatePic" class="pic-item">
            <el-image
              style="width: 100px; height: 100px"
              :src="certificatePic"
              :preview-src-list="[certificatePic]"
            />
            <span>合作协议</span>
          </div>
          <div v-if="lastPushMoneyPic" class="pic-item">
            <el-image
              style="width: 100px; height: 100px"
              :src="lastPushMoneyPic"
              :preview-src-list="[lastPushMoneyPic]"
            />
            <span>最后一次提现回单</span>
          </div>
          <div v-if="identityCardPic" class="pic-item">
            <el-image
              style="width: 100px; height: 100px"
              :src="identityCardPic"
              :preview-src-list="[identityCardPic]"
            />
            <span>身份证正面</span>
          </div>
          <div v-if="identityCardPic2" class="pic-item">
            <el-image
              style="width: 100px; height: 100px"
              :src="identityCardPic2"
              :preview-src-list="[identityCardPic2]"
            />
            <span>身份证反面</span>
          </div>
          <div v-if="bankCertificatePic" class="pic-item">
            <el-image
              style="width: 100px; height: 100px"
              :src="bankCertificatePic"
              :preview-src-list="[bankCertificatePic]"
            />
            <span v-if="bankType === 1">对公账户证明</span>
            <span v-else>个人说明函</span>
          </div>
          <div v-if="replenishCertificate" class="pic-item">
            <el-image
              style="width: 100px; height: 100px"
              :src="replenishCertificate"
              :preview-src-list="[replenishCertificate]"
            />
            <span>补充资料</span>
          </div>
        </div>
        <p v-if="!lastPushMoneyPic" class="pic-tips">
          系统中无最近的提现完成银行回单，可能是首次提现。
        </p>
        <p
          v-if="
            !placeNoPic ||
              !certificatePic ||
              (bankType === 2 && (!identityCardPic || !identityCardPic2)) ||
              !bankCertificatePic
          "
          class="pic-tips"
        >
          *系统中无{{ !placeNoPic ? '宗教场所,' : '' }}
          {{ !certificatePic ? '合作协议,' : '' }}
          {{ bankType === 2 && !identityCardPic ? '身份证正面,' : '' }}
          {{ bankType === 2 && !identityCardPic2 ? '身份证反面,' : '' }}
          {{
            !bankCertificatePic ? '个人说明函,' : ''
          }}资料，请联系市场工作人员。
        </p>
        <div>银行名称：{{ bankName }}</div>
        <div class="mg-t-10">支行名称：{{ subBankName }}</div>
        <div class="mg-t-10">银行开户名称：{{ accountName }}</div>
        <div class="mg-t-10">银行卡号：{{ accountNumber }}</div>
      </el-card>
    </el-card>
    <feedback-images :ok="succeedUpload" />
    <rate-list />
    <Add :temple-name="templeName" :temple-id="templeId" :ok="1" />
    <Bill :temple-id="templeId" />
  </div>
</template>

<script>
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';
// import $ from 'jquery';
// import '@fancyapps/fancybox/dist/jquery.fancybox.css';
// import '@fancyapps/fancybox';
// import fancyboxConfig from '../../configs/fancybox';
import FeedbackImages from './FeedbackImages';
import RateList from './RateList';
import Bill from './Bill';
import Add from './Add';
import './fetch';

export default {
  name: 'App',
  components: { RateList, FeedbackImages, Add, Bill },
  data() {
    return {
      loading: !0,
      // 展示类型 || 1：按时间展示，2：按项目展示
      showType: 2,
      dateItems: [],
      // 总金额
      totalAmount: 0,
      // 增值服务费
      totalIncreaseCharge: 0,
      // 渠道服务费
      totalChannelCharge: 0,
      // 渠道服务费补贴
      totalChannelSubsidy: 0,
      // 功能服务费
      totalFunctionCharge: 0,
      // 推广员奖励金
      totalPromoterReward: 0,
      // 实际提现金额
      realTakeAmount: 0,
      // 打赏自在家的金额
      platformSupport: 0,
      // 特殊提现超限服务费
      specialCharge: 0,
      // 寺院名
      templeName: '',
      // 银行名称
      bankName: '',
      // 支行名称
      subBankName: '',
      // 银行开户名称
      accountName: '',
      // 银行卡号
      accountNumber: '',
      // 回单照片
      feedbackImages: [],
      // 提现注意事项
      remarks: [],
      // 寺院id
      templeId: 0,
      // type 字段
      type: 0,
      // 是否是疑问订单
      isQuestion: 0,
      // 疑问内容
      question: '',
      // 回答内容
      answer: '',
      // 当前id
      id: 0,
      // 订单状态
      typeText: '',
      // 更新时间
      updateTime: '',
      // 添加时间
      createTime: '',
      // 宗教场所
      placeNoPic: '',
      // 合作协议
      certificatePic: '',
      // 最后一次提现回单
      lastPushMoneyPic: '',
      // 身份证正反面
      identityCardPic:
        'https://pic.zizaihome.com/d8df2110-5564-11e7-acfa-00163e022fdd.jpg',
      identityCardPic2: '',
      // 个人说明函
      bankCertificatePic: '',
      // 补充资料
      replenishCertificate: '',
      // 1对公账户2个人账户
      bankType: 1,
    };
  },
  created() {
    this.path = this.$route.path;
    this.id = parseInt(this.$route.params.id, 10);

    seeFetch('finance/taking/info').then(res => {
      if (!res.success) {
        Notification({
          title: '提示',
          message: res.message,
        });
        return;
      }

      this.templeId = res.data.templeId;
      this.templeName = res.data.templeName;
      this.type = res.data.type;
      this.isQuestion = res.data.isQuestion;
      this.question = res.data.question;
      this.answer = res.data.answer;
      this.typeText = res.data.typeText;

      this.fetchRemarks();
      this.fetchList();
    });
  },

  beforeDestroy() {
    // this.$route 在这里不准确
    this.$store.commit('DEL_VISITED_VIEW', { path: this.path });
  },
  methods: {
    fetchRemarks() {
      seeFetch('finance/taking/remarks', {
        templeId: this.templeId,
      }).then(res => {
        if (!res.success || !res.data || !res.data.length) return;

        this.remarks = res.data;
      });
    },
    fetchList() {
      this.loading = !0;
      seeFetch('finance/taking/orders', {
        id: this.id,
        showType: this.showType,
      }).then(res => {
        if (!res.success) {
          Notification({
            title: '提示',
            message: res.message,
          });
          return;
        }

        this.dateItems = res.data.dateItems;
        this.totalAmount = res.data.totalAmount || 0;
        this.totalIncreaseCharge = res.data.totalIncreaseCharge || 0;
        this.totalChannelCharge = res.data.totalChannelCharge || 0;
        this.totalChannelSubsidy = res.data.totalChannelSubsidy || 0;
        this.totalFunctionCharge = res.data.totalFunctionCharge || 0;
        this.totalPromoterReward = res.data.totalPromoterReward || 0;
        this.realTakeAmount = res.data.realTakeAmount || 0;
        this.platformSupport = res.data.platformSupport || 0;
        this.specialCharge = res.data.specialCharge || 0;
        this.bankName = res.data.account.bankName || '';
        this.subBankName = res.data.account.subBankName || '';
        this.accountName = res.data.account.accountName || '';
        this.accountNumber = res.data.account.accountNumber || '';
        this.feedbackImages = res.data.feedbackImages || [];
        this.updateTime = res.data.updateTime;
        this.createTime = res.data.createTime;
        this.certificatePic = res.data.certificatePic;
        this.lastPushMoneyPic = res.data.lastPushMoneyPic;
        this.placeNoPic = res.data.placeNoPic;
        this.bankCertificatePic = res.data.bank.certificatePicUrl;
        this.identityCardPic = res.data.bank.identityCardPic;
        this.identityCardPic2 = res.data.bank.identityCardPic2;
        this.replenishCertificate = res.data.bank.replenishCertificate;
        this.bankType = res.data.bank.type;
        this.loading = !1;
        console.log(this.dateItems);
      });
    },
    fetchStat() {
      seeFetch('finance/taking/orders').then(res => {
        this.toHandleCount = res.toHandleCount || 0;
        this.toReplyCount = res.toReplyCount || 0;
      });
    },
    updateRemark(remark) {
      seeFetch('finance/taking/updateRemark', {
        id: remark.id,
        status: remark.takeEffect ? 0 : 1,
      }).then(res => {
        if (!res.success) {
          Notification({
            title: '提示',
            message: res.message,
          });
          return;
        }

        // eslint-disable-next-line no-param-reassign
        remark.takeEffect = remark.takeEffect ? 0 : 1;

        Notification({
          title: '提示',
          message: '操作成功',
        });
      });
    },
    changeShowType(showType) {
      if (this.showType === showType) return;

      this.showType = showType;
      this.fetchList();
    },
    toAnswer() {
      this.$prompt('回复疑问账单', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        if (!value) return;

        seeFetch('finance/taking/answer', {
          id: this.id,
          content: value,
        }).then(res => {
          if (!res.success) {
            Notification({
              title: '提示',
              message: res.message,
            });
            return;
          }

          Notification({
            title: '提示',
            message: '回复成功',
          });

          this.type = 2;
          this.answer = value;
        });
      });
    },
    confirmTake() {
      this.$confirm('确认账单数据无误？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        seeFetch('finance/taking/confirm', { id: this.id }).then(res => {
          if (!res.success) {
            Notification({
              title: '提示',
              message: res.message,
            });
            return;
          }

          Notification({
            title: '提示',
            message: '操作成功',
          });

          this.$router.back();
        });
      });
    },
    confirmReceive() {
      if (!this.feedbackImages || !this.feedbackImages.length) {
        Notification({
          title: '提示',
          message: '您还没上传回执单图片，请上传后再确认',
        });
        return;
      }

      this.$confirm('确认账单并发送提醒？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        seeFetch('finance/taking/finish', {
          id: this.id,
          images: this.feedbackImages.join(','),
        }).then(res => {
          if (!res.success) {
            Notification({
              title: '提示',
              message: res.message,
            });
            return;
          }

          Notification({
            title: '提示',
            message: '操作成功',
          });

          this.$router.back();
        });
      });
    },
    addBill() {
      this.$store.state.financeTaking.showAddBill = !0;
    },
    showBillList() {
      this.$store.state.financeTaking.showBillList = !0;
    },
    uploadFeedbackImages() {
      this.$store.state.financeTaking.add.dialogTitle = '上传银行回单照片';
      this.$store.state.financeTaking.add.visible = !0;
      this.$store.state.financeTaking.add.editFeedbackImages = [
        ...this.feedbackImages,
      ];
    },
    succeedUpload(images) {
      this.feedbackImages = images;
    },
    seeRateList(index1, index2, row) {
      this.$store.state.financeTaking.rateList.visible = !0;
      this.$store.state.financeTaking.rateList.list = [
        ...this.dateItems[index1].orders[index2].promotionRateList,
      ];
      console.log(123412341234, row);
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  padding: 40px 20px;
}

.unit-container {
  margin-top: 10px;
}

.unit {
  position: relative;
  width: 100%;
}

// 项目汇总样式更改

.unit-inner {
  width: 100%;
  height: 54px;
  line-height: 54px;
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
  border-bottom: 1px solid #eee;
}

.cell {
  width: 15%;
  float: left;
  height: 54px;
  padding: 0 10px;
  line-height: 54px;
  text-align: center;
  font-size: 12px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
}

.cell-name {
  width: 40%;
  text-align: left;
  padding-top: 7px;
  padding-bottom: 7px;
}

.unit-small {
  .cell-name {
    padding-top: 0;
    padding-bottom: 0;
  }
  .cell-name p {
    margin-bottom: 0;
    line-height: 20px;
  }
  .unit-inner,
  .cell,
  .cell-name p {
    height: 40px;
    line-height: 40px;
  }
}

.unit-head {
  .unit-inner {
    background: #f4f4f4;
    border-top: 1px solid #eee;
  }

  .cell {
    color: #000;
  }
  .cell-name {
    padding-top: 0;
    padding-bottom: 0;
  }
}

.badge {
  display: inline-block;
  height: 22px;
  line-height: 22px;
  padding: 0 11px;
  border-radius: 11px;
  font-size: 12px;
  margin-right: 5px;
}
.badge-green {
  color: #0c6;
  background-color: #e9f9e9;
  border: 1px solid #0c6;
}
.badge-blue {
  color: #39f;
  background-color: #e3eeff;
  border: 1px solid #39f;
}
.badge-yellow {
  color: #f93;
  background-color: #fff4e9;
  border: 1px solid #f93;
}

.question {
  margin-left: 5px;
  position: relative;
  top: 2px;
  cursor: pointer;
  font-size: 20px;
}

.remark-row {
  position: relative;
  padding-left: 60px;
  margin-top: 20px;

  &:first-child {
    margin-top: 0;
  }
}

.remark-btn {
  position: absolute;
  left: 20px;
  top: 50%;
  width: 24px;
  height: 24px;
  margin-top: -12px;
  background-image: url('https://pic.zizaihome.com/5440698c-b00d-11e8-b58d-00163e0c001e.svg');
  background-size: 100% 100%;
  cursor: pointer;
}

.remark-row.disabled {
  text-decoration: line-through;

  .remark-btn {
    background-image: url('https://pic.zizaihome.com/7b48a7d8-b00d-11e8-9360-00163e0c001e.svg');
  }
}

.tips-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.pic-list {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 0;
}
.pic-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
  img {
    border-radius: 8px;
  }
  span {
    margin-top: 4px;
  }
}
.pic-tips {
  margin: 10px 0 20px 0;
  color: red;
  font-size: 16px;
}
</style>
