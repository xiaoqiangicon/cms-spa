<template>
  <el-dialog
    :visible="visible"
    :title="dialogTitle"
    :before-close="clickCancel"
    width="40%"
  >
    <div class="content">
      <div v-if="isUpdate" class="row">
        <div class="row-name">
          寺院：
        </div>
        <span class="l-hg-32">{{ templeName }}</span>
      </div>
      <div v-else class="row">
        <div class="row-name">
          寺院：
        </div>
        <el-select
          v-model="templeId"
          v-loading="loadingTemples"
          placeholder="请选择"
          size="small"
          style="width: 200px;"
          @change="onChangeTemple"
        >
          <el-option :value="0" label="请选择寺院" />
          <el-option
            v-for="item in temples"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          />
        </el-select>
      </div>
      <div v-if="isUpdate" class="row">
        <div class="row-name">
          佛事：
        </div>
        <span class="l-hg-32">{{ foShiName }}</span>
      </div>
      <div v-else class="row">
        <div class="row-name">
          佛事：
        </div>
        <el-select
          v-model="foShiId"
          v-loading="loadingFoShi"
          placeholder="请选择"
          size="small"
          style="width: 200px;"
        >
          <el-option :value="0" label="请选择佛事" />
          <el-option
            v-for="item in foShiItems"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          />
        </el-select>
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
import { now, numOfDateTime } from '@zzh/n-util';
import { foShiAddProps } from './data';

const computedProps = {};

foShiAddProps.forEach(({ name, full }) => {
  if (full) {
    computedProps[name] = {
      get() {
        return this.$store.state.financeIncome.foShiAdd[name];
      },
      set(value) {
        const key = `financeIncome/foShiAdd/update${name
          .slice(0, 1)
          .toUpperCase()}${name.slice(1)}`;
        this.$store.commit(key, value);
      },
    };
  } else {
    computedProps[name] = function() {
      return this.$store.state.financeIncome.foShiAdd[name];
    };
  }
});

// 寺院数据
let temples = [
  // {id, name}
];

// 佛事数据
const foShi = {
  // templeId => [{id, name}]
};

export default {
  name: 'FoShiAdd',
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
      loadingTemples: !1,
      loadingFoShi: !1,
      // 寺院
      temples: [
        // {id, name}
      ],
      // 佛事列表
      foShiItems: [
        // {id, name}
      ],
    };
  },
  computed: {
    ...computedProps,
  },
  created() {
    if (temples && temples.length) this.temples = [...temples];
    else {
      this.loadingTemples = !0;
      seeFetch('finance/income/temples').then(res => {
        this.loadingTemples = !1;

        if (!res.success || !res.data || !res.data.length) return;

        temples = res.data;
        this.temples = [...temples];
      });
    }
  },
  methods: {
    clickCancel() {
      this.$store.commit(`financeIncome/foShiAdd/updateVisible`, !1);
    },
    clickOk() {
      const { templeId, foShiId, takeEffectTime } = this;

      const serviceCharge = parseFloat(this.serviceCharge);

      let error;

      if (!templeId) error = '请选择寺院';
      else if (!foShiId) error = '请选择佛事';
      else if (!serviceCharge) error = '支付服务费不能为空';
      else if (!takeEffectTime) error = '生效时间不能为空';
      else if (numOfDateTime(now.dateTime) > numOfDateTime(takeEffectTime))
        error = '生效时间不能在当前时刻之前';
      else {
        let max = 100;
        const foShiItem = this.item;

        if (foShiItem.promoteRate) max -= foShiItem.promoteRate;
        else if (foShiItem.promoteAmount && foShiItem.price > 0)
          max -= parseFloat(
            (foShiItem.promoteAmount / foShiItem.price).toFixed(2)
          );

        if (foShiItem.serviceRate) max -= foShiItem.serviceRate;
        else if (foShiItem.serviceAmount && foShiItem.price > 0)
          max -= parseFloat(
            (foShiItem.serviceAmount / foShiItem.price).toFixed(2)
          );

        max = parseFloat(max.toFixed(2));

        if (serviceCharge > max)
          error = `当前佛事正在分销推广中，分成比例不可超过 ${max}%`;
      }

      if (error) {
        Notification({
          title: '提示',
          message: error,
        });
        return;
      }

      this.saving = !0;

      let fetchName = 'finance/income/updateFoShi';
      if (!this.isUpdate) fetchName = 'finance/income/addFoShi';

      seeFetch(fetchName, {
        id: templeId,
        serviceCharge,
        takeEffectTime,
        foShiId,
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

        this.$store.commit(`financeIncome/foShiAdd/updateVisible`, !1);
        this.ok();
      });
    },
    onChangeTemple() {
      this.foShiId = 0;
      if (!this.templeId) {
        this.foShiItems = [];
        return;
      }

      const foShiItems = foShi[this.templeId];

      if (foShiItems) this.foShiItems = [...foShiItems];
      else {
        this.loadingFoShi = !0;
        seeFetch('finance/income/foShi', { templeId: this.templeId }).then(
          res => {
            this.loadingFoShi = !1;

            if (!res.success || !res.data || !res.data.length) return;

            foShi[this.templeId] = res.data;
            this.foShiItems = [...res.data];
          }
        );
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
