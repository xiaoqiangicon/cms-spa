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
          支出金额：
        </div>
        <el-input
          v-model="amount"
          size="small"
          style="width: 200px;"
        />&nbsp;&nbsp;
        <span class="l-hg-32">元</span>
      </div>
      <div class="row">
        <div class="row-name">
          支出说明：
        </div>
        <el-input
          v-model="desc"
          type="textarea"
          rows="3"
          style="width: 100%;"
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
import { kindUseRecordsProps } from './data';

const computedProps = {};

kindUseRecordsProps.forEach(({ name, full }) => {
  if (full) {
    computedProps[name] = {
      get() {
        return this.$store.state.financeIncome.kindUse[name];
      },
      set(value) {
        const key = `financeIncome/ziYingUse/update${name
          .slice(0, 1)
          .toUpperCase()}${name.slice(1)}`;
        this.$store.commit(key, value);
      },
    };
  } else {
    computedProps[name] = function() {
      return this.$store.state.financeIncome.kindUse[name];
    };
  }
});

export default {
  name: 'KindUse',
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
      amount: '',
      desc: '',
    };
  },
  computed: {
    ...computedProps,
  },
  methods: {
    clickCancel() {
      this.$store.commit(`financeIncome/kindUse/updateVisible`, !1);
    },
    clickOk() {
      const { statisticsId, desc } = this;

      const amount = parseFloat(this.amount);

      let error;

      if (!amount) error = '请输入金额';
      // else if (amount > this.item.remainAmount)
      //   error = `已超过剩余金额 ${this.item.remainAmount}`;
      else if (!desc) error = '请输入支出说明';

      if (error) {
        Notification({
          title: '提示',
          message: error,
        });
        return;
      }

      this.saving = !0;
      seeFetch('finance/income/addProjectExpenditure', {
        statisticsId,
        money: amount,
        content: desc,
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
          message: '添加成功',
        });

        this.$store.commit(`financeIncome/kindUse/updateVisible`, !1);
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
