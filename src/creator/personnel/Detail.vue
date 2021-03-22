<template>
  <div class="contain" v-if="showDetail">
    <el-dialog
      :title="type === 1 ? '添加创作者' : '创作者提现资料'"
      :visible="showDialog"
      :before-close="close"
    >
      <div class="" v-if="type === 1">
        <div class="search">
          <div class="search-content">
            <div class="search-row">
              <span>手机号码</span>
              <el-input type="number" v-model="phone" placeholder="手机号码" />
            </div>
            <div class="search-row">
              <span>AppID</span>
              <el-input type="text" v-model="appId" placeholder="请输入AppID" />
            </div>
          </div>
          <el-button class="search-btn" @click="search">搜索</el-button>
        </div>
        <div class="info">
          <div class="info-content" v-if="userInfo.hasUser">
            <img class="avatar" :src="userInfo.headImg" alt="" />
            <div class="">
              <div class="name-row">
                <span>App昵称：{{ userInfo.nickName }}</span>
                <div class="verify-sign" v-if="userInfo.isBonze">法师认证</div>
              </div>
              <div class="">AppID：{{ userInfo.userId }}</div>
              <div class="">手机号码：{{ userInfo.phone }}</div>
            </div>
          </div>
          <div class="info-empty" v-else>
            {{ isSearching ? '没有找到该用户哦~' : '' }}
          </div>
        </div>
        <el-button class="add-btn" type="primary" @click="addUser"
          >添加</el-button
        >
      </div>
      <div class="bank-info" v-if="type === 2">
        <div class="bank-info-row">
          <span class="bank-info-title">AppID：</span>
          <span class="bank-info-value">{{ bankInfo.id }}</span>
        </div>
        <div class="bank-info-row">
          <span class="bank-info-title">App昵称：</span>
          <span class="bank-info-value">{{ bankInfo.nickName }}</span>
        </div>
        <div class="bank-info-row">
          <span class="bank-info-title">真实姓名：</span>
          <span class="bank-info-value">{{ bankInfo.name }}</span>
        </div>
        <div class="bank-info-row">
          <span class="bank-info-title">身份证账号：</span>
          <span class="bank-info-value">{{ bankInfo.idCard }}</span>
        </div>
        <div class="bank-info-row">
          <span class="bank-info-title">银行账号：</span>
          <span class="bank-info-value">{{ bankInfo.bankCard }}</span>
        </div>
        <div class="bank-info-row">
          <span class="bank-info-title">开户银行：</span>
          <span class="bank-info-value">{{ bankInfo.bank }}</span>
        </div>
        <div class="bank-info-row">
          <span class="bank-info-title">开户所在支行名称：</span>
          <span class="bank-info-value">{{ bankInfo.underBank }}</span>
        </div>
        <div class="bank-info-cardImg">
          <span class="bank-info-title">身份证</span>
          <div class="cardImg-box">
            <img class="cardImg" :src="bankInfo.cardImgFront" alt="" />
            <img class="cardImg" :src="bankInfo.cardImgBack" alt="" />
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Notification } from 'element-ui';
import seeFetch from 'see-fetch';

export default {
  name: 'Detail',
  props: {
    showDetail: {
      isRequired: !0,
      type: Boolean,
    },
    type: {
      isRequired: !0,
      type: Number,
    },
    bankInfo: {
      type: Object,
    },
  },
  data() {
    return {
      showDialog: !0,
      title: '添加创作者',
      userId: '', // 搜索出来的用户的userId
      phone: '',
      appId: '', // appId搜索text
      userInfo: {},
      isCreative: !1, // 是否已注册短视频创作者
      isSearching: !1,
    };
  },
  methods: {
    search() {
      if (!this.appId && !this.phone) {
        Notification({
          title: '提示',
          message: '请先输入手机号或者AppID~',
        });
        return;
      }
      this.isSearching = !0;
      seeFetch('creator/personnel/findPerson', {
        account: this.appId,
        phone: this.phone,
      }).then(res => {
        if (res.errorCode === 0) {
          this.userInfo = res.data;
          this.userId = res.data.userId || '';
          this.isCreative = res.data.isCreative || '';
        } else {
          Notification({
            title: '提示',
            message: '网络出错~',
          });
          return;
        }
      });
    },
    addUser() {
      if (!this.userId) {
        Notification({
          title: '提示',
          message: '请先选择创作者哦~',
        });
        return;
      }
      if (this.isCreative) {
        Notification({
          title: '提示',
          message: '该用户已注册视频创作者啦~',
        });
        return;
      }
      seeFetch('creator/personnel/addUser', { userId: this.userId }).then(
        res => {
          if (res.errorCode === 0) {
            window.location.reload();
          } else {
            Notification({
              title: '提示',
              message: res.message,
            });
            return;
          }
        }
      );
    },
    close() {
      this.$emit('closeDialog', !1);
    },
  },
};
</script>

<style lang="less" scoped>
.search {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
.search-content {
  width: 80%;
  flex-shrink: 0;
}
.search-row {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  span {
    width: 60px;
    flex-shrink: 0;
    margin-right: 10px;
  }
}
.info-content {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #eaf4ff;
  border-radius: 6px;
  font-size: 16px;
  line-height: 28px;
  img {
    flex-shrink: 0;
    width: 60px;
    height: 60px;
    margin-right: 20px;
    border-radius: 50%;
  }
}
.name-row {
  display: flex;
  align-items: center;
}
.verify-sign {
  width: 80px;
  margin-left: 10px;
  border: 1px solid #0099ff;
  color: #0099ff;
  text-align: center;
  font-size: 14px;
  line-height: 20px;
  border-radius: 12px;
  background-color: #d0e4ff;
}

.add-btn {
  display: block;
  margin: 0 auto;
}

.bank-info-row {
  line-height: 24px;
  font-size: 16px;
  margin-bottom: 6px;
}
.bank-info-title {
  margin-right: 16px;
}
.bank-info-cardImg {
  font-size: 16px;
}
.cardImg-box {
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
}
.cardImg {
  width: 48%;
}
</style>
