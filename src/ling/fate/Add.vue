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
          攻略标题：
        </div>
        <el-input v-model="title" size="small" style="width: 200px;" />
      </div>
      <div class="row">
        <div class="row-name">
          攻略详情：
        </div>
        <el-input v-model="content" size="small" type="textarea" rows="3" />
      </div>
      <div class="row">
        <div class="row-name">
          生效日期：
        </div>
        <el-date-picker
          v-model="date"
          align="right"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="small"
        />
      </div>
      <div class="row">
        <div class="row-name">
          优先级：
        </div>
        <el-input v-model="priority" size="small" style="width: 200px;" />
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
        return this.$store.state.lingFate.add[name];
      },
      set(value) {
        const key = `lingFate/update${name
          .slice(0, 1)
          .toUpperCase()}${name.slice(1)}`;
        this.$store.commit(key, value);
      },
    };
  } else {
    computedProps[name] = function() {
      return this.$store.state.lingFate.add[name];
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
  methods: {
    clickCancel() {
      this.$store.commit(`lingFate/updateVisible`, !1);
    },
    clickOk() {
      if (this.saving) return;

      let error;

      const { title, content, startDate, endDate } = this;
      const priority = parseInt(this.priority, 10) || 0;

      if (!title) error = '攻略标题不能为空';
      else if (!content) error = '攻略详情不能为空';
      else if (!startDate) error = '生效日期 - 开始日期不能为空';
      else if (!endDate) error = '生效日期 - 结束日期不能为空';

      if (error) {
        Notification({
          title: '提示',
          message: error,
        });
        return;
      }

      this.saving = !0;

      const params = {
        title,
        content,
        startDate,
        endDate,
        priority,
      };

      if (this.isUpdate) {
        params.id = this.updateId;
        seeFetch('ling/fate/update', params).then(res => {
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

          this.$store.commit(`lingFate/updateVisible`, !1);
          this.ok();
        });
      } else {
        seeFetch('ling/fate/add', params).then(res => {
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

          this.$store.commit(`lingFate/updateVisible`, !1);
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
