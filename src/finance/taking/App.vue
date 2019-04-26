<template>
  <div class="container">
    <el-card v-loading="loading">
      <div class="content">
        <div
          v-for="(dateItem, index) in dateItems"
          :key="index"
          class="unit-container"
        >
          <div class="head">
            <div class="unit unit-head">
              <div class="unit-inner">
                <div v-if="displayType === 1" class="cell cell-name">
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
                <div class="cell">
                  增值服务费
                </div>
                <div class="cell">
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
                  {{ order.title }}
                </div>
                <div class="cell">
                  {{ order.count }}
                </div>
                <div class="cell">¥{{ order.amount }}</div>
                <div class="cell">
                  {{
                    order.increaseCharge
                      ? '-¥' + order.increaseCharge
                      : '无服务费'
                  }}
                </div>
                <div class="cell">-¥{{ order.channelCharge }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-card class="mg-t-20">
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
        </div>
      </el-card>
      <el-card class="mg-t-20">
        <div slot="header" class="clearfix">
          <span>{{ templeName }}账户信息</span>
        </div>
        <div>银行名称：{{ bankName }}</div>
        <div class="mg-t-10">支行名称：{{ subBankName }}</div>
        <div class="mg-t-10">银行开户名称：{{ accountName }}</div>
        <div class="mg-t-10">银行卡号：{{ accountNumber }}</div>
      </el-card>
    </el-card>
  </div>
</template>

<script>
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';
// import $ from 'jquery';
// import '@fancyapps/fancybox/dist/jquery.fancybox.css';
// import '@fancyapps/fancybox';
// import fancyboxConfig from '../../configs/fancybox';
// import Add from './Add';
import './fetch';

export default {
  name: 'App',
  // components: { Add },
  data() {
    return {
      loading: !0,
      // 展示类型 || 1：按时间展示，2：按项目展示
      displayType: 1,
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
    };
  },
  created() {
    seeFetch('finance/taking/orders').then(res => {
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
      this.loading = !1;
    });
  },
  methods: {
    fetchStat() {
      seeFetch('finance/taking/orders').then(res => {
        this.toHandleCount = res.toHandleCount || 0;
        this.toReplyCount = res.toReplyCount || 0;
      });
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
</style>
