<template>
  <el-dialog
    title="撤回转单"
    :visible.sync="visible"
    :before-close="
      () => {
        sVisible = false;
      }
    "
  >
    <div class="row">
      <div class="title">
        佛事名称
      </div>
      <div class="content">
        ：{{ transferOrderDetail.buddhistName }}
      </div>
    </div>
    <div class="row">
      <div class="title">
        选择项名称
      </div>
      <div class="content">
        ：{{ transferOrderDetail.subName }}
      </div>
    </div>
    <div class="row">
      <div class="title">
        撤回寺院
      </div>
      <div class="content">
        ：{{ transferOrderDetail.templeName }}
      </div>
    </div>
    <div class="tip">
      <div>温馨提示</div>
      <div>撤回后，请在“未转单列表”查看此订单</div>
    </div>
    <div
      class="mg-t-20"
      style="text-align: center;"
    >
      <el-button
        type="primary"
        @click="handleCancel"
      >
        确认撤回
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';

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
    computedProps[name] = function() {
      return this.$store.state.promoIndex.add[name];
    };
  }
});

export default {
  name: 'DialogRetract',
  props: ['visible'],
  data() {
    return {
      sVisible: this.visible,
    };
  },
  computed: {
    ...computedProps,
  },
  watch: {
    visible(val) {
      this.sVisible = val;
    },
    sVisible(val) {
      this.$emit('updateVisible', val);
    },
  },
  methods: {
    handleCancel() {
      seeFetch('promo/index/transfer/retract', {
        orderId: this.transferOrderDetail.id,
      }).then(res => {
        if (!res.success) {
          Notification({
            type: 'error',
            title: '提示',
            message: res.message,
          });
          return;
        }

        Notification({
          type: 'success',
          title: '提示',
          message: '撤回成功',
        });

        this.$emit('submit');
        this.$emit('updateVisible', !1);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.row {
  font-size: 16px;
  display: flex;
  .title {
    flex-basis: 100px;
  }
}
.tip {
  width: 400px;
  padding: 10px;
  margin-top: 20px;
  background: #f6ffed;
  border: 1px solid #b7eb8f;
  border-radius: 4px;
}
</style>
