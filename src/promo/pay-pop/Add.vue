<template>
  <el-dialog
    :visible="visible"
    :title="dialogTitle"
    :before-close="clickCancel"
    width="40%"
  >
    <div class="content">
      <h2>基本设置</h2>
      <hr />
      <div class="row">
        <div class="row-name">
          标题：
        </div>
        <el-input v-model="title" style="width: 100%;" />
      </div>
      <div class="row">
        <div class="row-name">
          图片：
        </div>
        <Upload :images="covers" :multiple="false" />
      </div>
      <div class="row">
        <div class="row-name">
          生效时间：
        </div>
        <el-date-picker
          v-model="takeEffectTimeRange"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['12:00:00']"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </div>
      <div class="row">
        <div class="row-name">
          优先级：
        </div>
        <el-input v-model="sort" style="width: 100%;" />
        <p class="mg-t-10">
          数字越大越优先
        </p>
      </div>
      <div class="row">
        <div class="row-name">
          跳转链接：
        </div>
        <el-input v-model="redirect" style="width: 100%;" />
      </div>
      <h2>弹窗规则</h2>
      <hr />
      <div class="row">
        <div class="row-name">
          模块：
        </div>
        <el-select
          slot="prepend"
          v-model="moduleId"
          placeholder="请选择"
          style="width: 100%;"
        >
          <el-option label="全部" :value="0" />
          <el-option label="佛事（非运营活动）" :value="1" />
          <el-option label="千寺祈福" :value="2" />
          <el-option label="日行一善" :value="3" />
          <el-option label="法师加持" :value="4" />
          <el-option label="法师供养" :value="5" />
          <el-option label="功德箱" :value="6" />
        </el-select>
      </div>
      <div v-show="moduleId === 1 || moduleId === 3" class="row">
        <div class="row-name">
          项目ID：
        </div>
        <el-input v-model="moduleContentId" style="width: 100%;" />
        <p class="mg-t-10">
          如佛事ID，日行一善ID（注意：0或不填表示全部）
        </p>
      </div>
      <div class="row">
        <div class="row-name">
          金额范围：
        </div>
        <el-input v-model="minAmount" style="width: 100px;" />
        -
        <el-input v-model="maxAmount" style="width: 100px;" />
      </div>
      <div class="row">
        <div class="row-name">
          适用用户：
        </div>
        <el-select
          slot="prepend"
          v-model="userGroupId"
          placeholder="请选择"
          style="width: 100%;"
        >
          <el-option label="全部" :value="0" />
          <el-option
            v-for="(item, index) in userGroups"
            :key="index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </div>
      <div class="row pd-t-5">
        <div class="row-name">
          注册APP：
        </div>
        <el-radio v-model="registerApp" :label="0">
          不限制
        </el-radio>
        <el-radio v-model="registerApp" :label="1">
          是
        </el-radio>
        <el-radio v-model="registerApp" :label="2">
          否
        </el-radio>
      </div>
      <div class="row">
        <div class="row-name">
          APP注册天数：
        </div>
        <el-input v-model="registeredDays" style="width: 100px;" />
        天以内（0表示当天）
      </div>
      <div class="row pd-t-5">
        <div class="row-name">
          支付环境：
        </div>
        <el-radio v-model="payEnv" :label="0">
          不限制
        </el-radio>
        <el-radio v-model="payEnv" :label="1">
          APP
        </el-radio>
        <el-radio v-model="payEnv" :label="2">
          微信
        </el-radio>
      </div>
      <div class="row pd-t-5">
        <div class="row-name">
          点击后不再弹出：
        </div>
        <el-radio v-model="showOnce" :label="0">
          否
        </el-radio>
        <el-radio v-model="showOnce" :label="1">
          是
        </el-radio>
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
import Upload from '../../com/upload/Upload';

const computedProps = {};

addProps.forEach(({ name, full }) => {
  if (full) {
    computedProps[name] = {
      get() {
        return this.$store.state.promoPayPop.add[name];
      },
      set(value) {
        this.$store.state.promoPayPop.add[name] = value;
      },
    };
  } else {
    computedProps[name] = function() {
      return this.$store.state.promoPayPop.add[name];
    };
  }
});

export default {
  name: 'Add',
  components: {
    Upload,
  },
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
      userGroups: [],
    };
  },
  computed: {
    ...computedProps,
  },
  created() {
    seeFetch('promo/pay-pop/userGroups', {}).then(res => {
      this.userGroups = res.data || [];
    });
  },
  methods: {
    clickCancel() {
      this.$store.state.promoPayPop.add.visible = !1;
    },
    clickOk() {
      if (this.saving) return;

      let error;

      const {
        // 标题
        title,
        // 封面
        covers,
        // 开始时间、结束时间
        takeEffectTimeRange,
        // 排序（越大越靠前）
        sort,
        // 跳转链接
        redirect,
        // 模块（0: 全部, 1: 佛事, 2: 千寺祈福, 3: 日行一善, 4: 法师加持, 5: 法师供养, 6: 功德箱）
        moduleId,
        // 模块内容ID（0表示全部）
        moduleContentId,
        // 最少金额
        minAmount,
        // 最大金额
        maxAmount,
        // 精细化运营用户分组（0表示全部）
        userGroupId,
        // 是否已经注册app（0：不限制，1：已经注册，2：没有注册）
        registerApp,
        // 用户注册多少天（0表示当天）
        registeredDays,
        // 支付环境（0：不限制，1：app，2：微信）
        payEnv,
        // 是否只显示一次（1：是，0：否）
        showOnce,
      } = this;

      const registeredDaysInt = parseInt(registeredDays, 10);

      if (!title) error = '标题不能为空';
      else if (!covers.length) error = '图片不能为空';
      else if (!takeEffectTimeRange.length) error = '生效时间不能为空';
      else if (!redirect) error = '跳转链接不能为空';
      else if (Number.isNaN(registeredDaysInt) || registeredDaysInt < 0)
        error = '用户注册多少天不能为空，且须是大于或等于0的数字';

      if (error) {
        Notification({
          title: '提示',
          message: error,
        });
        return;
      }

      const cover = covers[0];
      const startTime = takeEffectTimeRange[0];
      const endTime = takeEffectTimeRange[1];

      this.saving = !0;

      const params = {
        // 标题
        title,
        // 封面
        cover,
        // 开始时间
        startTime,
        // 结束时间
        endTime,
        // 排序（越大越靠前）
        sort: parseInt(sort, 10) || 0,
        // 跳转链接
        redirect,
        // 模块（0: 全部, 1: 佛事, 2: 千寺祈福, 3: 日行一善, 4: 法师加持, 5: 法师供养, 6: 功德箱）
        moduleId,
        // 模块内容ID（0表示全部）
        moduleContentId: parseInt(moduleContentId, 10) || 0,
        // 最少金额
        minAmount: parseInt(minAmount, 10) || 0,
        // 最大金额
        maxAmount: parseInt(maxAmount, 10) || 0,
        // 精细化运营用户分组（0表示全部）
        userGroupId,
        // 是否已经注册app（0：不限制，1：已经注册，2：没有注册）
        registerApp,
        // 用户注册多少天（0表示当天）
        registeredDays: registeredDaysInt,
        // 支付环境（0：不限制，1：app，2：微信）
        payEnv,
        // 是否只显示一次（1：是，0：否）
        showOnce,
      };

      if (this.isUpdate) {
        params.id = this.updateId;
        seeFetch('promo/pay-pop/update', params).then(res => {
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

          this.visible = !1;
          this.ok();
        });
      } else {
        seeFetch('promo/pay-pop/add', params).then(res => {
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

          this.visible = !1;
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
  padding-left: 120px;
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
