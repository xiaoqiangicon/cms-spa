<template>
  <el-dialog
    :visible="visible"
    :title="dialogTitle"
    :before-close="clickCancel"
    width="40%"
  >
    <div class="content">
      <p>收据照片：</p>
      <img
        v-for="img in receiptImages"
        :key="img"
        :src="img"
        class="dp-block wd-100-pc mg-b-10"
      />
      <p>寺院已经上传收据照片，请审核寺院上传“收据照片”是否有问题：</p>
      <p>1.审核收据照片没有问题后，点击“确认，没有问题”。</p>
      <p>2.审核收据照片发现有问题，点击“有问题”并联系寺院。</p>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button v-loading="saving" type="primary" @click="clickOk">
        确认，没有问题
      </el-button>
      <el-button v-loading="saving" @click="clickNo">
        有问题
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
        return this.$store.state.financeTaking.add[name];
      },
      set(value) {
        const key = `financeTaking/update${name
          .slice(0, 1)
          .toUpperCase()}${name.slice(1)}`;
        this.$store.commit(key, value);
      },
    };
  } else {
    computedProps[name] = function() {
      return this.$store.state.financeTaking.add[name];
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
      this.$store.commit(`financeTaking/updateVisible`, !1);
    },
    clickNo() {
      this.$prompt('请输入收据有什么问题', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        if (!value) return;

        this.saving = !0;
        seeFetch('finance/taking/makeQuestion', {
          id: this.updateId,
          reason: value,
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
            message: '更新成功',
          });

          this.$store.commit(`financeTaking/updateVisible`, !1);
          this.ok();
        });
      });
    },
    clickOk() {
      this.$confirm(
        '请确认收据正确无误，并且已将善款打给寺院；确认之后将不能更改',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(() => {
        this.saving = !0;
        seeFetch('finance/taking/makeDone', { id: this.updateId }).then(res => {
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

          this.$store.commit(`financeTaking/updateVisible`, !1);
          this.ok();
        });
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
