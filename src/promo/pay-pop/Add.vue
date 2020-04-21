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
          标题：
        </div>
        <el-input v-model="title" style="width: 100%;" />
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
        return this.$store.state.financeRemark.add[name];
      },
      set(value) {
        this.$store.state.financeRemark.add[name] = value;
      },
    };
  } else {
    computedProps[name] = function() {
      return this.$store.state.financeRemark.add[name];
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
  },
  methods: {
    clickCancel() {
      this.$store.state.financeRemark.add.visible = !1;
    },
    clickOk() {
      if (this.saving) return;

      let error;

      const { templeId, content } = this;

      if (!templeId) error = '请选择寺院';
      else if (!content) error = '内容不能为空';

      if (error) {
        Notification({
          title: '提示',
          message: error,
        });
        return;
      }

      this.saving = !0;

      const params = {
        templeId,
        content,
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

          this.$store.commit(`financeRemark/updateVisible`, !1);
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

          this.$store.commit(`financeRemark/updateVisible`, !1);
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
