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
          记录名称：
        </div>
        <el-input v-model="recordName" size="small" style="width: 200px;" />
      </div>
      <div class="row">
        <div class="row-name">
          来源寺院：
        </div>
        <el-select
          v-model="incomeFromId"
          v-loading="loadingTemples"
          placeholder="请选择"
          size="small"
          style="width: 200px;"
          filterable
        >
          <el-option label="请选择寺院" :value="0" />
          <el-option
            v-for="item in temples"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </div>
      <div class="row">
        <div class="row-name">
          相关模块：
        </div>
        <el-select
          v-model="relatedItemId"
          placeholder="请选择"
          size="small"
          style="width: 200px;"
          filterable
        >
          <el-option
            v-for="item in relatedItems"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </div>
      <div class="row">
        <div class="row-name">
          盈收金额：
        </div>
        <el-input v-model="income" size="small" style="width: 200px;" />
        <span class="l-hg-32">元</span>
      </div>
      <div class="row">
        <div class="row-name">
          入账时间：
        </div>
        <el-date-picker
          v-model="incomeTime"
          align="right"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期"
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
import { addProps } from './data';
import { items as relatedItems } from './constant';

const computedProps = {};

addProps.forEach(({ name, full }) => {
  if (full) {
    computedProps[name] = {
      get() {
        return this.$store.state.financeRecord.add[name];
      },
      set(value) {
        const key = `financeRecord/update${name
          .slice(0, 1)
          .toUpperCase()}${name.slice(1)}`;
        this.$store.commit(key, value);
      },
    };
  } else {
    computedProps[name] = function() {
      return this.$store.state.financeRecord.add[name];
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
      relatedItems,
      temples: [],
      loadingTemples: !1,
    };
  },
  computed: {
    ...computedProps,
    date: {
      get() {
        return this.startDate && this.endDate
          ? [this.startDate, this.endDate]
          : '';
      },
      set(value) {
        const [startDate, endDate] = value;

        this.startDate = startDate;
        this.endDate = endDate;
      },
    },
  },
  created() {
    this.loadingTemples = !0;
    seeFetch('finance/record/temples').then(res => {
      this.loadingTemples = !1;
      this.temples = res.data || [];
    });
  },
  methods: {
    clickCancel() {
      this.$store.commit(`financeRecord/updateVisible`, !1);
    },
    clickOk() {
      if (this.saving) return;

      let error;

      const {
        recordName,
        incomeFromId,
        relatedItemId,
        // income,
        incomeTime,
      } = this;
      const income = parseFloat(this.income);

      if (!recordName) error = '记录名称不能为空';
      else if (!incomeFromId) error = '寺院不能为空';
      else if (!income) error = '盈收金额不能为空，且需是数字';
      else if (!incomeTime) error = '入账时间不能为空';

      if (error) {
        Notification({
          title: '提示',
          message: error,
        });
        return;
      }

      this.saving = !0;

      const params = {
        name: recordName,
        templeId: incomeFromId,
        itemId: relatedItemId,
        income,
        incomeTime,
      };

      if (this.isUpdate) {
        params.id = this.updateId;
        seeFetch('finance/record/update', params).then(res => {
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

          this.$store.commit(`financeRecord/updateVisible`, !1);
          this.ok();
        });
      } else {
        seeFetch('finance/record/add', params).then(res => {
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

          this.$store.commit(`financeRecord/updateVisible`, !1);
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
