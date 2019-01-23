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
          发奖日期：
        </div>
        <el-date-picker
          v-model="date"
          align="right"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
          size="small"
          style="width: 200px;"
        />
      </div>
      <div class="row">
        <div class="row-name">
          奖品类型：
        </div>
        <el-select
          v-model="type"
          placeholder="请选择"
          size="small"
          style="width: 200px;"
        >
          <el-option value="1" label="话费" />
          <el-option value="2" label="现金" />
        </el-select>
      </div>
      <div class="row">
        <div class="row-name">
          奖品金额：
        </div>
        <el-input
          v-if="type === '2'"
          v-model="amount"
          size="small"
          style="width: 200px;"
        />
        <el-select
          v-else
          v-model="amount"
          placeholder="请选择"
          size="small"
          style="width: 200px;"
        >
          <el-option
            v-for="price in prices"
            :key="price"
            :value="price"
            :label="price + '元'"
          />
        </el-select>
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
import { addProps } from './data';

const computedProps = {};

addProps.forEach(({ name, full }) => {
  if (full) {
    computedProps[name] = {
      get() {
        return this.$store.state.lingGift.add[name];
      },
      set(value) {
        const key = `lingGift/update${name
          .slice(0, 1)
          .toUpperCase()}${name.slice(1)}`;
        this.$store.commit(key, value);
      },
    };
  } else {
    computedProps[name] = function() {
      return this.$store.state.lingGift.add[name];
    };
  }
});

export default {
  name: 'Add',
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
      prices: [1, 2, 3, 5, 6, 10, 20, 30, 50, 100, 200, 300, 500].map(
        i => `${i}`
      ),
    };
  },
  computed: {
    ...computedProps,
  },
  methods: {
    clickCancel() {
      this.$store.commit(`lingGift/updateVisible`, !1);
    },
    clickOk() {
      if (this.saving) return;

      let error;

      const { date } = this;
      const type = parseInt(this.type, 10);
      const amount = parseFloat(this.amount);

      if (!date) error = '发奖日期不能为空';
      else if (!type) error = '奖品类型不能为空';
      else if (!this.amount) error = '奖品金额不能为空';
      else if (`${this.amount}`.length !== `${amount}`.length)
        error = '奖品金额输入不合法';
      else if (amount <= 0) error = '奖品金额必须是大于 0 的数字';
      else if (type === 1 && this.prices.indexOf(this.amount) < 0)
        error = '请先选择一个合法的奖品金额';

      if (error) {
        Notification({
          title: '提示',
          message: error,
        });
        return;
      }

      this.saving = !0;

      const params = { date, type, amount };

      if (this.isUpdate) {
        params.id = this.updateId;
        seeFetch('ling/gift/update', params).then(res => {
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

          this.$store.commit(`lingGift/updateVisible`, !1);
          this.ok();
        });
      } else {
        seeFetch('ling/gift/add', params).then(res => {
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

          this.$store.commit(`lingGift/updateVisible`, !1);
          this.ok();
        });
      }
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
