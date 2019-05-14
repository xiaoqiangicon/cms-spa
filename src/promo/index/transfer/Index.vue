<template>
  <div>
    <div class="container">
      <div class="filter">
        <div v-if="activeName === 'buddhist'">
          <div
            class="tip fl-left"
          >
            转单系统：手动调度APP的订单给指定的寺院处理、自动调度为APP超度和祈福的组合单其中转单系统与推广佛事为互斥关系，但两者都可设置分享激励
          </div>
          <div class="fl-right mg-t-40">
            <el-button
              type="primary"
              size="small"
              @click="addTransferBuddhistDialogVisible = true"
            >
              添加转单佛事
            </el-button>
          </div>
        </div>
        <div v-else>
          <div class="pd-t-30">
            <div class="mg-r-10 fl-left">
              佛事名称 &nbsp;&nbsp;
              <el-select
                v-model="buddhistId"
                placeholder="请选择"
                size="small"
                style="width: 200px;"
                filterable
                @change="refresh" 
              >
                <el-option
                  value="0"
                  label="全部"
                />
                <el-option
                  v-for="item in buddhistList"
                  :key="item.id"
                  :value="item.id"
                  :label="item.name"
                />
              </el-select>
            </div>
            <div
              class="fl-left mg-r-10"
              style="width: 250px;"
            >
              <el-input
                v-model="tel"
                placeholder="请填写手机号"
                size="small"
              />
            </div>
            <div class="fl-left">
              <el-button
                icon="el-icon-search"
                size="small"
                type="primary"
                @click="refresh"
              >
                搜索
              </el-button>
            </div>
          </div>
        </div>
      </div>
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane
          label="佛事管理"
          name="buddhist"
        >
          <TableBuddhist />
        </el-tab-pane>
        <el-tab-pane
          label="未转单项"
          name="notTransfer"
        >
          <TableNotTransfer />
        </el-tab-pane>
        <el-tab-pane
          label="已转单项"
          name="yetTransfer"
        >
          <TableYetTransfer />
        </el-tab-pane>
      </el-tabs>
    </div>
    <AddTransferBuddhistDialog />
  </div>
</template>

<script>
import './fetch';
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';
import { addProps } from '../data';
import AddTransferBuddhistDialog from './AddTransferBuddhistDialog';
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
        const key = `promoIndex/update${name.slice(0, 1).toUpperCase()}${name.slice(1)}`;
        this.$store.commit(key, value);
      }
    }
  } else {
    computedProps[name] = function() {
      return this.$store.state.promoIndex.add[name];
    }
  }
})

export default {
  name: 'Transfer',
  components: {
    AddTransferBuddhistDialog,
    TableBuddhist,
    TableYetTransfer,
    TableNotTransfer,
  },
  data() {
    return {
      activeName: 'buddhist',

      buddhistId: '0',
      tel: '',

      buddhistList: [],
    };
  },
  computed: {
    ...computedProps,
  },
  created() {
    this.getBuddhistList();
  },
  methods: {
    refresh() {

    },
    getBuddhistList() {
      seeFetch('promo/index/transfer/getBuddhistList', {})
      .then(res => {
        if(!res.success) {
          Notification({
            type: 'error',
            title: '提示',
            message: res.message,
          });
          return;
        }

        this.buddhistList = res.data;
      })
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
