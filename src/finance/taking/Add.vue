<template>
  <el-dialog
    :visible="visible"
    title="添加"
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
          v-model="templeName"
          placeholder="请选择"
          size="small"
          style="width: 200px;"
          filterable
          disabled
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
          营收金额：
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

export default {
  name: 'Add',
  props: {
    templeName: {
      type: String,
      defalut: '',
      isRequired: !0,
    },
    templeId: {
      type: Number,
      default: '',
      isRequired: !0,
    },
  },
  data() {
    return {
      recordName: '',
      incomeFromId: '',
      relatedItemId: '',
      incomeTime: '',
      income: '',
      saving: !1,
      relatedItems,
      temples: [],
    };
  },
  computed: {
    visible() {
      return this.$store.state.financeTaking.showAddBill;
    },
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
  methods: {
    clickCancel() {
      this.$store.state.financeTaking.showAddBill = !1;
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
        templeId,
      } = this;
      const income = parseFloat(this.income);

      if (!recordName) error = '记录名称不能为空';
      else if (!income) error = '营收金额不能为空，且需是数字';
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
        templeId,
        itemId: relatedItemId,
        income,
        incomeTime,
      };

      seeFetch('finance/taking/add', params).then(res => {
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

        this.$store.state.financeTaking.showAddBill = !1;
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
