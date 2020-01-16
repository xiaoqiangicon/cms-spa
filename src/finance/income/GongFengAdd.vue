<template>
  <el-dialog
    :visible="visible"
    :title="dialogTitle"
    :before-close="clickCancel"
    width="40%"
  >
    <div class="content">
      <div class="row">
        <div class="row-name">
          寺院：
        </div>
        <span class="l-hg-32">{{ templeName }}</span>
      </div>
      <div class="row">
        <div class="row-name">
          支付服务费：
        </div>
        <el-input v-model="serviceCharge" size="small" style="width: 200px;" />
        <span class="l-hg-32">%</span>
      </div>
      <div class="row">
        <div class="row-name">
          生效时间：
        </div>
        <el-date-picker
          v-model="takeEffectTime"
          align="right"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          size="small"
          style="width: 200px;"
        />
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="clickCancel">
        取 消
      </el-button>
      <el-button v-loading="saving" type="primary" @click="clickOk">
        确 定
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import { Notification } from 'element-ui';
import seeFetch from 'see-fetch';
import { now, numOfDateTime } from '../../../pro-com/src/utils';
import { gongFengAddProps } from './data';

const computedProps = {};

gongFengAddProps.forEach(({ name, full }) => {
  if (full) {
    computedProps[name] = {
      get() {
        return this.$store.state.financeIncome.gongFengAdd[name];
      },
      set(value) {
        const key = `financeIncome/gongFengAdd/update${name
          .slice(0, 1)
          .toUpperCase()}${name.slice(1)}`;
        this.$store.commit(key, value);
      },
    };
  } else {
    computedProps[name] = function() {
      return this.$store.state.financeIncome.gongFengAdd[name];
    };
  }
});

export default {
  name: 'GongFengAdd',
  props: {
    ok: {
      type: Function,
      required: !0,
      default: undefined,
    },
  },
  data() {
    return {
      saving: !1,
    };
  },
  computed: {
    ...computedProps,
  },
  methods: {
    clickCancel() {
      this.$store.commit(`financeIncome/gongFengAdd/updateVisible`, !1);
    },
    clickOk() {
      const { takeEffectTime } = this;

      const serviceCharge = parseFloat(this.serviceCharge);

      let error;

      if (!serviceCharge) error = '支付服务费不能为空';
      else if (!takeEffectTime) error = '生效时间不能为空';
      else if (numOfDateTime(now.dateTime) > numOfDateTime(takeEffectTime))
        error = '生效时间不能在当前时刻之前';

      if (error) {
        Notification({
          title: '提示',
          message: error,
        });
        return;
      }

      this.saving = !0;
      seeFetch('finance/income/updateGongFeng', {
        id: this.updateId,
        serviceCharge,
        takeEffectTime,
      }).then(res => {
        this.saving = !1;

        if (!res.success) {
          Notification({
            title: '提示',
            message: res.message,
          });
          return;
        }

        Notification({
          title: '提示',
          message: '更新成功',
        });

        this.$store.commit(`financeIncome/gongFengAdd/updateVisible`, !1);
        this.ok();
      });
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  padding: 0 20px;
}

.row {
  position: relative;
  margin-top: 20px;
  padding-left: 100px;
  min-height: 32px;

  &:first-child {
    margin-top: 0;
  }
}

.row-name {
  position: absolute;
  top: 0;
  left: 0;
  line-height: 32px;
  font-size: 16px;
}
</style>
