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
        请将自营佛事加入到列表中，并设置公司分成比例<br />
        分成比例会即时计算与更新，而营收统计中的数据展示会在当天的24:00刷新，所以展示的数据是前一天的。
      </el-alert>
      <div v-if="isUpdate" class="row">
        <div class="row-name">
          佛事名称：
        </div>
        <span class="l-hg-32">{{ foShiId + ' - ' + foShiName }}</span>
      </div>
      <div v-else class="row">
        <div class="row-name">
          佛事名称：
        </div>
        <el-select
          v-model="foShiId"
          v-loading="loadingZiYing"
          placeholder="请选择"
          size="small"
          style="width: 200px;"
          filterable
        >
          <el-option :value="0" label="请选择佛事" />
          <el-option
            v-for="item in ziYingItems"
            :key="item.id"
            :value="item.id"
            :label="item.id + ' - ' + item.name"
          />
        </el-select>
      </div>
      <div class="row">
        <div class="row-name">
          公司分成：
        </div>
        <el-input
          v-model="corporationProfitRate"
          size="small"
          style="width: 200px;"
        />
        <span class="l-hg-32">%</span>
      </div>
      <div class="row">
        <div class="row-name">
          项目类型：
        </div>
        <el-select
          v-model="type"
          placeholder="请选择"
          size="small"
          style="width: 200px;"
          filterable
          :disabled="isUpdate"
        >
          <el-option
            v-for="item in ziYingTypes"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          />
        </el-select>
        <p class="mg-t-10">
          保存后项目类型不可修改，慎重
        </p>
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
import { ziYingAddProps, ziYingTypes } from './data';

const computedProps = {};

ziYingAddProps.forEach(({ name, full }) => {
  if (full) {
    computedProps[name] = {
      get() {
        return this.$store.state.financeIncome.ziYingAdd[name];
      },
      set(value) {
        const key = `financeIncome/ziYingAdd/update${name
          .slice(0, 1)
          .toUpperCase()}${name.slice(1)}`;
        this.$store.commit(key, value);
      },
    };
  } else {
    computedProps[name] = function() {
      return this.$store.state.financeIncome.ziYingAdd[name];
    };
  }
});

export default {
  name: 'ZiYingAdd',
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
      ziYingTypes,
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
      seeFetch('finance/income/ziYingFoShi').then(res => {
        if (!res.success || !res.data || !res.data.length) return;

        this.ziYingItems = [...res.data];
      });
    },
    clickCancel() {
      this.$store.commit(`financeIncome/ziYingAdd/updateVisible`, !1);
    },
    clickOk() {
      const { foShiId, type } = this;

      const corporationProfitRate = parseFloat(this.corporationProfitRate);

      let error;

      if (!foShiId) error = '请选择佛事';
      else if (!corporationProfitRate) error = '公司分成不能为空';
      else if (corporationProfitRate < 0) error = '公司分成不能为负数';
      else if (corporationProfitRate > 100) error = '公司分成不能为大于100%';

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
        seeFetch('finance/income/updateZiYing', {
          foShiId,
          corporationProfitRate,
          type,
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

          this.$store.commit(`financeIncome/ziYingAdd/updateVisible`, !1);
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
