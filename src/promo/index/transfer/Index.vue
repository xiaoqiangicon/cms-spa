<template>
  <div>
    <div class="container">
      <div class="filter">
        <div v-if="activeName === 'tableBuddhist'">
          <div
            class="tip fl-left"
          >转单系统：手动调度APP的订单给指定的寺院处理、自动调度为APP超度和祈福的组合单其中转单系统与推广佛事为互斥关系，但两者都可设置分享激励</div>
          <div class="fl-right mg-t-40">
            <el-button
              type="primary"
              size="small"
              @click="dialogAddTransferBuddhistVisible = true"
            >添加转单佛事</el-button>
          </div>
        </div>
        <div v-else>
          <div class="pd-t-30">
            <div class="mg-r-10 fl-left">佛事名称 &nbsp;&nbsp;
              <el-select
                v-model="buddhistId"
                placeholder="请选择"
                size="small"
                style="width: 200px;"
                @change="handleChangeBuddhist"
                filterable
              >
                <el-option value="0" label="全部"/>
                <el-option
                  v-for="item in buddhistList"
                  :key="item.id"
                  :value="item.id"
                  :label="item.name"
                />
              </el-select>
            </div>
            <div class="mg-r-10 fl-left">选择项名称 &nbsp;&nbsp;
              <el-select
                v-model="subId"
                placeholder="请选择"
                size="small"
                style="width: 200px;"
                filterable
              >
                <el-option value="0" label="全部"/>
                <el-option
                  v-for="item in subList"
                  :key="item.id"
                  :value="item.id"
                  :label="item.name"
                />
              </el-select>
            </div>
            <div class="fl-right">
              <el-button icon="el-icon-search" size="small" type="primary" @click="refreshTableData(activeName)">搜索</el-button>
            </div>
            <div class="fl-right mg-r-10" style="width: 120px;">
              <el-input v-model="tel" placeholder="请填写手机号" size="small"/>
            </div>
          </div>
        </div>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="佛事管理" name="tableBuddhist">
          <TableBuddhist ref="tableBuddhist"/>
        </el-tab-pane>
        <el-tab-pane label="未转单项" name="tableNotTransfer">
          <TableNotTransfer
            ref="tableNotTransfer"
            :buddhistId="buddhistId"
            :subId="subId"
            :tel="tel"
          />
        </el-tab-pane>
        <el-tab-pane label="已转单项" name="tableYetTransfer">
          <TableYetTransfer
            ref="tableYetTransfer"
            :buddhistId="buddhistId"
            :subId="subId"
            :tel="tel"
          />
        </el-tab-pane>
      </el-tabs>
    </div>
    <DialogAddTransferBuddhist @save="refreshTableData('tableBuddhist')"/>
  </div>
</template>

<script>
import './fetch';
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';
import { addProps } from '../data';
import DialogAddTransferBuddhist from './DialogAddTransferBuddhist';
import TableBuddhist from './TableBuddhist';
import TableYetTransfer from './TableYetTransfer';
import TableNotTransfer from './TableNotTransfer';

const computedProps = {};
addProps.forEach(({ name, full }) => {
  if (full) {
    computedProps[name] = {
      get() {
        return this.$store.state.promoIndex.add[name];
      },
      set(value) {
        const key = `promoIndex/update${name
          .slice(0, 1)
          .toUpperCase()}${name.slice(1)}`;
        this.$store.commit(key, value);
      },
    };
  } else {
    computedProps[name] = function() {
      return this.$store.state.promoIndex.add[name];
    };
  }
});

export default {
  name: 'Transfer',
  components: {
    DialogAddTransferBuddhist,
    TableBuddhist,
    TableYetTransfer,
    TableNotTransfer,
  },
  data() {
    return {
      activeName: 'tableBuddhist',

      buddhistId: '0',
      subId: '0',
      tel: '',

      buddhistList: [],
      subList: [],
    };
  },
  computed: {
    ...computedProps,
  },
  created() {
    this.getBuddhistList();
  },
  methods: {
    refresh() {},
    refreshTableData(tableName) {
      this.$refs[tableName].refresh();
    },
    getBuddhistList() {
      seeFetch('promo/index/transfer/getBuddhistList', {}).then(res => {
        if (!res.success) {
          Notification({
            type: 'error',
            title: '提示',
            message: res.message,
          });
          return;
        }

        this.buddhistList = res.data;
        this.subList = [];
      });
    },
    handleChangeBuddhist(index) {
      this.subList = this.buddhistList.find(
        item => item.id === this.buddhistId
      ).subList;
      this.subId = '0';
    },
    handleClick() {
      console.log(this.activeName);
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
}
.filter {
  height: 100px;
  margin-bottom: 20px;
  .tip {
    width: 400px;
    padding: 20px;
    background: #f6ffed;
    border: 1px solid #b7eb8f;
    border-radius: 4px;
  }
}
</style>
