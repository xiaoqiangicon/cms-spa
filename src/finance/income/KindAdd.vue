<template>
  <el-dialog
    :visible="visible"
    :title="dialogTitle"
    :before-close="clickCancel"
    width="40%"
  >
    <div class="content">
      <el-alert type="success">
        <span class="f-s-16">温馨提示</span><br /><br />
        运营营收留存公司比例会即时计算与更新，而营收统计中的数据展示会在当天的24:00刷新，历史数据不会被更新。
      </el-alert>
      <div v-if="!1" class="row">
        <div class="row-name">
          佛事名称：
        </div>
        <span class="l-hg-32">{{ foShiId + ' - ' + foShiName }}</span>
      </div>
      <div class="row">
        <div class="row-name">
          运营营收留存公司比例：
        </div>
        <el-input
          v-model="corporationProfitRate"
          size="small"
          style="width: 200px;"
        />
        <span class="l-hg-32">%</span>
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
import { kindAddProps } from './data';

const computedProps = {};

kindAddProps.forEach(({ name, full }) => {
  if (full) {
    computedProps[name] = {
      get() {
        return this.$store.state.financeIncome.kindAdd[name];
      },
      set(value) {
        const key = `financeIncome/kindAdd/update${name
          .slice(0, 1)
          .toUpperCase()}${name.slice(1)}`;
        this.$store.commit(key, value);
      },
    };
  } else {
    computedProps[name] = function() {
      return this.$store.state.financeIncome.kindAdd[name];
    };
  }
});

export default {
  name: 'kindAdd',
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
      isSaving: !1,
      loadingZiYing: !1,
      // 佛事列表
      ziYingItems: [
        // {id, name}
      ],
    };
  },
  computed: {
    ...computedProps,
  },
  created() {
    this.fetchZiYingItems();
  },
  methods: {
    // 每次添加后都要刷新
    fetchZiYingItems() {
      seeFetch('finance/income/getProjectList').then(res => {
        if (!res.success || !res.data || !res.data.length) return;

        this.ziYingItems = [...res.data];
      });
    },
    clickCancel() {
      this.$store.commit(`financeIncome/kindAdd/updateVisible`, !1);
    },
    clickOk() {
      const corporationProfitRate = parseFloat(this.corporationProfitRate);

      let error;

      if (!corporationProfitRate) error = '运营营收留存公司比例不能为空';
      else if (corporationProfitRate < 0)
        error = '运营营收留存公司比例不能为负数';
      else if (corporationProfitRate > 100)
        error = '运营营收留存公司比例不能为大于100%';

      if (error) {
        Notification({
          title: '提示',
          message: error,
        });
        return;
      }

      if (!this.isSaving) {
        this.isSaving = !0;
        this.saving = !0;
        seeFetch('finance/income/addProjectProportion', {
          proportion: corporationProfitRate,
          statisticsId: this.statisticsId,
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
            message: `${this.isUpdate ? '更新' : '添加'}成功`,
          });

          this.$store.commit(`financeIncome/kindAdd/updateVisible`, !1);
          this.isSaving = !1;
          this.fetchZiYingItems();
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
  padding-left: 180px;
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
