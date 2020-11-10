<template>
  <transition name="slide-fade">
    <div class="s-mask" v-show="showDetail" @click.self="onClickMask">
      <div class="s-container">
        <div class="body">
          <div class="cell">
            <div class="cell-title">
              {{ detail.name ? '编辑设备' : '添加设备' }}
            </div>
            <div class="cell-body">
              <div class="row mg-b-20">
                <p class="row-title">寺院名称</p>
                <el-select value-key="value" filterable v-model="templeId">
                  <el-option
                    v-for="item in templeList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="row mg-b-20">
                <p class="row-title">设备类型</p>
                <el-select
                  value-key="value"
                  v-model="type"
                  @change="changeType"
                >
                  <el-option
                    v-for="item in typeList"
                    :key="item.vaule"
                    :label="item.name"
                    :value="item.vaule"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="row mg-b-20" v-if="!showNetWork">
                <p class="row-title">绑定网关</p>
                <el-select value-key="value" v-model="gate">
                  <el-option
                    v-for="item in gateList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.deviceSerial"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="row mg-b-20">
                <p class="row-title">设备编号</p>
                <input class="input-text" type="text" v-model="deviceSerial" />
              </div>
              <div class="row mg-b-20" v-if="needValidCode">
                <p class="row-title">验证码</p>
                <input class="input-text" type="text" v-model="validateCode" />
              </div>
              <div class="row mg-b-20">
                <p class="row-title">设备名称</p>
                <input class="input-text" type="text" v-model="name" />
              </div>
            </div>
          </div>
        </div>
        <div class="foot">
          <div class="save-btn" @click="save">保存</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import seeFetch from 'see-fetch';
import Upload from '../../com/upload/Upload';
import { MessageBox } from 'element-ui';

export default {
  name: 'Detail',
  props: ['detail', 'showDetail'],
  data() {
    return {
      id: '',
      name: '',
      gate: '',
      gateList: [],
      type: '',
      deviceSerial: '',
      validateCode: '',
      templeId: '',
      templeList: [],
      typeList: [],

      showNetWork: !0,
      needValidCode: !1,
    };
  },
  created() {
    this.fetchTempleList();
    this.fetchTypeList();
    this.fetchGateList();
  },
  watch: {
    detail(newVal) {
      this.id = newVal.id || 0;
      this.name = newVal.name || '';
      this.type = newVal.type || '';
      this.validateCode = newVal.validateCode || '';
      this.gate = this.validateCode || '';
      this.deviceSerial = newVal.deviceSerial || '';
      this.templeId = newVal.templeId || '';
      if (this.id) {
        this.typeList.forEach(item => {
          if (item.value === this.type) {
            this.needValidCode = item.needValidCode;
            this.showNetWork = item.showNetWork;
          }
        });
      }
    },
  },
  methods: {
    fetchTempleList() {
      seeFetch('hardware/hardwareManage/getTempleList', {}).then(res => {
        if (res.errorCode === 0) {
          this.templeList = res.data;
        }
      });
    },
    fetchTypeList() {
      seeFetch('hardware/hardwareManage/typeList', {}).then(res => {
        if (res.errorCode === 0) {
          this.typeList = res.data;
        }
      });
    },
    fetchGateList() {
      seeFetch('hardware/hardwareManage/getList', {
        type: 'gate_way',
      }).then(res => {
        if (res.errorCode === 0) {
          this.gateList = res.data.deviceList;
        }
      });
    },
    save() {
      if (!this.name || !this.type || !this.deviceSerial) {
        MessageBox.alert('请输入必要信息');
        return;
      }
      seeFetch('hardware/hardwareManage/edit', {
        id: this.id,
        name: this.name,
        type: this.type,
        validateCode: this.showNetWork ? this.validateCode : this.gate,
        deviceSerial: this.deviceSerial,
        templeId: this.templeId,
      }).then(res => {
        if (res.errorCode === 0) {
          window.location.reload();
        }
      });
    },
    changeType() {
      console.log('changeType', this.type);
      this.typeList.forEach(item => {
        if (item.vaule === this.type) {
          this.showNetWork = item.supportNetwork;
          this.needValidCode = item.needValidCode;
        }
      });
    },
    onClickMask() {
      this.isModify = !1;
      this.$emit('hideDetail', !1);
    },
  },
};
</script>

<style lang="less" scoped>
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.s-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
}
.s-container {
  position: absolute;
  top: 0;
  right: 0;
  width: 460px;
  height: 100%;
  padding-bottom: 80px;
  bottom: 0;
  background-color: #fff;
  color: #333;
  .body {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 80px;
    width: 100%;
    overflow-y: auto;
    .cell-title {
      height: 50px;
      margin-bottom: 10px;
      line-height: 50px;
      font-size: 18px;
      position: relative;
      padding-left: 34px;
      font-weight: bold;
      border-bottom: 1px solid #d8d8d8;
      &:before {
        position: absolute;
        top: 11px;
        left: 18px;
        content: '';
        width: 6px;
        height: 28px;
        background-color: #409eff;
      }
    }
    .cell-title-tip {
      font-size: 16px;
      color: #71ba31;
      float: right;
      margin-right: 20px;
      font-weight: normal;
    }
    .cell-body {
      padding: 14px 20px;
    }
  }
  .foot {
    position: absolute;
    width: 100%;
    height: 82px;
    bottom: 0;
    right: 0;
    background-color: #fff;
    padding: 16px 0;
    border-top: 2px solid #d8d8d8;
    text-align: center;
    z-index: 999;
    .foot-btn {
      display: flex;
      justify-content: space-between;
      padding: 0 40px;
    }
    .save-btn {
      width: 233px;
      height: 48px;
      margin: 0 auto;
      line-height: 48px;
      border-radius: 24px;
      background-color: #409eff;
      text-align: center;
      color: #fff;
      font-size: 18px;
      cursor: pointer;
    }
  }
}
.row {
  display: flex;
  align-items: center;
  padding: 0 20px;
}
.row-title {
  flex-shrink: 0;
  width: 70px;
  margin-right: 20px;
  font-size: 16px;
  font-weight: bold;
  text-align: right;
}
.input-text {
  width: 257px;
  height: 40px;
  padding: 0 15px;
  background-color: none;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  outline: none;
}
.row-value {
  font-size: 16px;
  font-weight: bold;
}
.avatar-box {
  position: relative;
}
.avatar-remove {
  position: absolute;
  right: -10px;
  top: -10px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: red;
  color: #fff;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  line-height: 20px;
  cursor: pointer;
}
.avatar {
  width: 100px;
}
</style>
