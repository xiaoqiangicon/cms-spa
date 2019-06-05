<template>
  <div>
    <div class="container">
      <div class="filter">
        <div v-if="transferActiveName === 'tableBuddhist'">
          <div class="tip fl-left">
            转单系统：手动调度APP的订单给指定的寺院处理、自动调度为APP超度和祈福的组合单其中转单系统与推广佛事为互斥关系，但两者都可设置分享激励
          </div>
          <div class="fl-right mg-t-40">
            <el-button
              type="primary"
              size="small"
              @click="dialogAddTransferBuddhistVisible = true"
            >
              添加转单佛事
            </el-button>
          </div>
        </div>
        <div v-else>
          <div class="pd-t-20">
            <div class="mg-r-10 f-s-16">
              当前佛事&nbsp;&nbsp;&nbsp;&nbsp; {{ transferBuddhistName }}
            </div>
            <div class="mg-t-20">
              <div class="mg-r-10 fl-left">
                选择项名称 &nbsp;&nbsp;
                <el-select
                  v-model="transferSubId"
                  placeholder="请选择"
                  size="small"
                  style="width: 200px;"
                  filterable
                  @change="refreshTableData(transferActiveName)"
                >
                  <el-option :value="0" label="全部" />
                  <el-option
                    v-for="item in transferSubList"
                    :key="item.id"
                    :value="item.id"
                    :label="item.name"
                  />
                </el-select>
              </div>
              <div class="fl-right">
                <el-button
                  icon="el-icon-search"
                  size="small"
                  type="primary"
                  @click="refreshTableData(transferActiveName)"
                >
                  搜索
                </el-button>
              </div>
              <div class="fl-right mg-r-10" style="width:  120px;">
                <el-input
                  v-model="transferTel"
                  placeholder="请填写手机号"
                  size="small"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-tabs v-model="transferActiveName">
        <el-tab-pane label="佛事管理" name="tableBuddhist">
          <TableBuddhist ref="tableBuddhist" />
        </el-tab-pane>
        <el-tab-pane
          :disabled="transferBuddhistId === ''"
          label="未转单项"
          name="tableNotTransfer"
        >
          <TableNotTransfer ref="tableNotTransfer" />
        </el-tab-pane>
        <el-tab-pane
          :disabled="transferBuddhistId === ''"
          label="已转单项"
          name="tableYetTransfer"
        >
          <TableYetTransfer ref="tableYetTransfer" />
        </el-tab-pane>
      </el-tabs>
    </div>
    <DialogAddTransferBuddhist @save="refreshTableData('tableBuddhist')" />
  </div>
</template>

<script>
import './fetch';
import DialogAddTransferBuddhist from './DialogAddTransferBuddhist';

import TableBuddhist from './TableBuddhist';
import TableYetTransfer from './TableYetTransfer';
import TableNotTransfer from './TableNotTransfer';

// const TableBuddhist = () => import('./TableBuddhist');
// const TableYetTransfer = () => import('./TableYetTransfer');
// const TableNotTransfer = () => import('./TableNotTransfer');

import { addProps } from '../data';

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
    /* eslint-disable */
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
      buddhistId: '0',
      subId: '0',
      tel: '',

      buddhistList: [],
      subList: [],
    };
  },
  computed: {
    ...computedProps,
    buddhistName() {
      const findItem = this.buddhistList.find(
        item => item.id === parseInt(this.buddhistId, 10)
      );
      if (findItem) {
        return findItem.name;
      }
      return '';
    },
  },
  watch: {
    transferActiveName(val) {
      this.refreshTableData(val);
    },
  },
  created() {
    this.transferActiveName = 'tableBuddhist';
  },
  methods: {
    refreshTableData(tableName) {
      this.$refs[tableName].refresh();
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
